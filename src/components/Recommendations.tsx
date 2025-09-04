import { useEffect, useState } from 'react'
import { Button } from "@/components/ui/button"
import {
	Table,
	TableBody,
	TableCell,
	TableHead,
	TableHeader,
	TableRow,
} from "@/components/ui/table"
import { createColumnHelper, flexRender, getCoreRowModel, getSortedRowModel, SortingState, useReactTable } from '@tanstack/react-table'
import Decimal from 'decimal.js'

import recDataStore from './Store_RecData'
import { InvestmentEnum, Recommendation } from './Types'
import { formatLargeNumber, formatTime, investmentNameString } from './Helpers'
import calcDataStore, { recCalcDataStore } from './Store_CalcData'
import staticDataStore from './Store_StaticData'
import userDataStore, { recUserDataStore } from './Store_UserData'
import { BsChevronDown, BsChevronUp } from 'react-icons/bs'

export default function RecommendationFilters() {
	const { sdAngelUpgrades, sdCashUpgrades, sdHasMegaTickets, sdSuits, sdSuperBadges, sdInvestments, sdUnlocks } = staticDataStore(state => ({ sdAngelUpgrades: state.staticData.angelUpgrades, sdCashUpgrades: state.staticData.cashUpgrades, sdHasMegaTickets: state.staticData.hasMegaTickets, sdSuits: state.suits, sdSuperBadges: state.superBadges, sdInvestments: state.staticData.investments, sdUnlocks: state.staticData.unlocks }))
	const {
		cdCalculate, cdRecTable, cdSetRecTable,
		cdCalcUpgradeCost, cdGetDifferenceNBonus,
		cdGetNextPositiveUnlock, cdTotalIncome,
		setCDAngelUpgrades, setCDAngelNotification,
		setCDSuits, setCDSuitNotification,
		setCDSuperBadges, setCDSuperBadgeNotification
	} = calcDataStore(state => ({
		cdCalculate: state.calculate, cdRecTable: state.recTable, cdSetRecTable: state.setRecTable,
		cdCalcUpgradeCost: state.calcUpgradeCost, cdGetDifferenceNBonus: state.getDifferenceNBonus,
		cdGetNextPositiveUnlock: state.getNextPositiveUnlock, cdTotalIncome: state.totalIncome,
		setCDAngelUpgrades: state.setAngelUpgrades, setCDAngelNotification: state.setAngelNotification,
		setCDSuits: state.setSuits, setCDSuitNotification: state.setSuitNotification,
		setCDSuperBadges: state.setSuperBadges, setCDSuperBadgeNotification: state.setSuperBadgeNotification
	}))
	const { uiCashUpgrades, uiNumAngels, uiSelectedWorld, uiNumCalculates, uiInvestments, uiChangeCashUpgradesBought, uiChangeInvestments, uiSaveData } = userDataStore(state => ({ uiCashUpgrades: state.cashUpgradesBought, uiNumAngels: state.numAngels, uiSelectedWorld: state.selectedWorld, uiNumCalculates: state.numCalculates, uiInvestments: state.investments, uiChangeCashUpgradesBought: state.changeCashUpgradesBought, uiChangeInvestments: state.changeInvestments, uiSaveData: state.saveData }))
	const {
		rfHide1, rfHide10, rfHide100,
		rfDays, rfHours, rfMinutes,
		rfPercentage
	} = recDataStore(state => ({
		rfHide1: state.hide1, rfHide10: state.hide10, rfHide100: state.hide100,
		rfDays: state.days, rfHours: state.hours, rfMinutes: state.minutes,
		rfPercentage: state.percent
	}))
	const {
		recUIPlanetOverride, recUIChangeInvestments,
		recUIChangeCashUpgradesBought,
		recUIChangeAngelUpgradesBought,
		recUIChangeNumAngels, recUIChangeBoughtSuitName,
		recUIChangeBoughtSuperBadge
	} = recUserDataStore(state => ({
		recUIPlanetOverride: state.planetOverride, recUIChangeInvestments: state.changeInvestments,
		recUIChangeCashUpgradesBought: state.changeCashUpgradesBought,
		recUIChangeAngelUpgradesBought: state.changeAngelUpgradesBought,
		recUIChangeNumAngels: state.changeNumAngels, recUIChangeBoughtSuitName: state.changeBoughtSuitName,
		recUIChangeBoughtSuperBadge: state.changeBoughtSuperBadgeIndex
	}))
	const recCDCalculate = recCalcDataStore(state => state.calculate)
	const [ sorting, setSorting ] = useState<SortingState>([ { id: 'score', desc: true } ])
	const [applyingAll, setApplyingAll] = useState(false)
	const [appliedCount, setAppliedCount] = useState<number | null>(null)
	const [toastTimer, setToastTimer] = useState<number | null>(null)
	const [appliedMessage, setAppliedMessage] = useState<string | null>(null)

	useEffect(() => {
		if (uiNumCalculates === 0) return
		calcRecommendations()
		calcAngels()
		calcSuits()
		calcSuperBadges()
	}, [uiNumCalculates])

	const recString = (rec: Recommendation) => {
		if (rec === undefined) return null
		if ('upgrade' in rec) {
			return `${investmentNameString(rec.upgrade, sdInvestments)}`
		} else {
			return `${rec.investment === InvestmentEnum.All ? 'All' : sdInvestments[rec.investment].name}`
		}
	}
	const applyRecommendation = (rec: Recommendation) => {
		if ('upgrade' in rec) {
			uiChangeCashUpgradesBought(rec.upgIndex, true, false, false)
		} else {
			uiChangeInvestments(rec.investment, rec.to, null)
		}
		cdCalculate()
	}

	const applyAllZeroTime = async () => {
		if (!cdRecTable || cdRecTable.length === 0) return
		setApplyingAll(true)
		// yield to renderer so the button's disabled/label updates before heavy work
		await new Promise(resolve => setTimeout(resolve, 0))
		try {
			// use cost-in-time = cost / cdTotalIncome to detect zero-time upgrades
			// consider "zero-time" as less than 1 second (formatTime shows 00:00:00 for <1)
			const timeThreshold = 1 // seconds
			const incomeNum = Number(cdTotalIncome) || 0
			let applied = 0
			let candidatesInPositivePrefix = 0
			const appliedRecs: Recommendation[] = []
			// helper to get numeric cost
			const getCostNum = (r: Recommendation) => {
				try {
					if (r.cost && typeof (r.cost as any).toNumber === 'function') return (r.cost as any).toNumber()
					return Number(r.cost ?? 0)
				} catch (e) {
					return Number(r.cost ?? 0)
				}
			}
			for (let i = 0; i < cdRecTable.length; i++) {
				const rec = cdRecTable[i]
				if ((rec.score ?? 0) <= 0) break // stop when encountering non-positive score
				const costNum = getCostNum(rec)
				if (!isFinite(costNum)) continue
				const time = incomeNum > 0 ? costNum / incomeNum : (costNum === 0 ? 0 : Infinity)
				if (isFinite(time) && time < timeThreshold) {
					candidatesInPositivePrefix++
					if ('upgrade' in rec) {
						uiChangeCashUpgradesBought(rec.upgIndex, true, false, false)
					} else {
						uiChangeInvestments(rec.investment, rec.to, null)
					}
					applied++
					appliedRecs.push(rec)
				}
			}
			// one final calculate after batch apply
			cdCalculate()
			// diagnostics: total zero-time by time metric
			const totalZeroTime = cdRecTable.filter(r => {
				const c = getCostNum(r)
				if (!isFinite(c)) return false
				const t = incomeNum > 0 ? c / incomeNum : (c === 0 ? 0 : Infinity)
				return isFinite(t) && t < timeThreshold
			}).length
			// dedupe appliedRecs: only mention largest per investment or per cash upgrade index
			const dedupeMap = new Map<string, Recommendation>()
			for (const r of appliedRecs) {
				let key: string
				if ('upgrade' in r) {
					key = `cash-${(r as any).upgIndex}`
				} else {
					key = `inv-${(r as any).investment}`
				}
				const existing = dedupeMap.get(key)
				if (!existing) {
					dedupeMap.set(key, r)
				} else {
					// choose the one with larger 'to' for investments; for cash upgrades keep existing
					if (!('upgrade' in r) && (r as any).to > (existing as any).to) {
						dedupeMap.set(key, r)
					}
				}
			}
			const dedupedDescriptions = Array.from(dedupeMap.values()).map(r => recString(r) + ('to' in r ? ` to ${ (r as any).to }` : ' Cash Upgrade'))
			const msg = applied > 0 ? `Applied ${applied} of ${candidatesInPositivePrefix} <1s recs in top-positive block (total <1s: ${totalZeroTime}): ${dedupedDescriptions.join(', ')}` : `No <1s recs applied. Found ${candidatesInPositivePrefix} <1s recs in top-positive block (total <1s: ${totalZeroTime})`
			
			setAppliedMessage(msg)
			if (toastTimer) {
				clearTimeout(toastTimer)
			}
			const t = window.setTimeout(() => setAppliedMessage(null), 60000)
			setToastTimer(t)
		} finally {
			setApplyingAll(false)
		}
	}

	const calcUpgradeScore = (unlockCostTime: number | Decimal) => {
		if (!isFinite(Number(unlockCostTime))) return 0
		const recCDTotalIncome = new Decimal(recCalcDataStore.getState().totalIncome)
		var overflowPotential = recCDTotalIncome.times(unlockCostTime),
		divNum = 0,
		retVal = recCDTotalIncome.minus(cdTotalIncome)
		while (!overflowPotential.isFinite()) {
			divNum += 100
			overflowPotential = recCDTotalIncome.times(new Decimal(unlockCostTime).div(new Decimal('1e+' + divNum)))
		}
		retVal = retVal.times(new Decimal('1e+21')).div(overflowPotential)
		if (divNum !== 0) retVal = retVal.times(new Decimal('1e+' + divNum))
		return retVal.toNumber()
	}

	const calcRecommendations = () => {
		let newRecTable: Recommendation[] = []
		recUIPlanetOverride(uiSaveData())
		const calcFilterTime = (rfDays === '' && rfHours === '' && rfMinutes === '') ? undefined : 0 + ((rfDays === '' ? 0 : rfDays) * 86400) + ((rfHours === '' ? 0 : rfHours) * 3600) + ((rfMinutes === '' ? 0 : rfMinutes) * 60)
		for (let i = 0; i < sdInvestments.length; i++) { // individual investments
			let inc = [ 1, 10, 100 ].filter((num) => 
				(num !== 1 || !rfHide1) && (num !== 10 || !rfHide10) && (num !== 100 || !rfHide100)
			)
			if (i === 1 && uiSelectedWorld === 'Earth') {
				for (let j = 1; j < 4; j++) {
					let k = cdGetDifferenceNBonus(i, j)
					if (k !== null) inc.push(k)
				}
			} else {
				let k = cdGetDifferenceNBonus(i, 1)
				if (k !== null) inc.push(k)
			}
			if (!sdHasMegaTickets) {
				let nPU = cdGetNextPositiveUnlock(i)
				if (nPU !== null) {
					let k = cdGetDifferenceNBonus(i, nPU)
					if (k !== null && inc.indexOf(k) === -1) inc.push(k)
				}
			}
			for (let j = 0; j < inc.length; j++) {
				recUIChangeInvestments(i, (uiInvestments[i].number === '' ? 0 : +uiInvestments[i].number) + inc[j], null)
				recCDCalculate()
				let rec: Recommendation = {
					investment: i,
					to: (uiInvestments[i].number === '' ? 0 : +uiInvestments[i].number) + inc[j],
					cost: cdCalcUpgradeCost(i, inc[j]) ?? -Infinity,
					income: recCalcDataStore.getState().totalIncome,
					score: -Infinity
				}
				if ((calcFilterTime === undefined || calcFilterTime > (rec.cost / cdTotalIncome)) && (rfPercentage === '' || rfPercentage < ((rec.income - cdTotalIncome) / cdTotalIncome))) {
					rec.score = calcUpgradeScore(rec.cost / cdTotalIncome)
					newRecTable.push(rec)
				}
			}
			recUIChangeInvestments(i, uiInvestments[i].number === '' ? 0 : uiInvestments[i].number, null) // reset it to original state
		}
		// cash upgrades
		let j = -1
		for (let i = 0; i < 22; i++) {
			j = uiCashUpgrades.indexOf(false, j + 1)
			if (j !== -1) {
				recUIChangeCashUpgradesBought(j, true, false, false)
				recCDCalculate()
				let rec: Recommendation = {
					upgrade: sdCashUpgrades[j],
					upgIndex: j,
					cost: sdCashUpgrades[j].cost?.price ?? 0,
					income: recCalcDataStore.getState().totalIncome,
					score: -Infinity
				}
				if ((calcFilterTime === undefined || calcFilterTime > (rec.cost / cdTotalIncome)) && (rfPercentage === '' || rfPercentage < ((rec.income - cdTotalIncome) / cdTotalIncome))) {
					rec.score = calcUpgradeScore(rec.cost / cdTotalIncome)
					newRecTable.push(rec)
				}
				recUIChangeCashUpgradesBought(j, false, false, false) // reset it
			} else {
				break
			}
		}
		// highest shared level unlocks
		if (sdUnlocks[sdInvestments.length].length > 0) {
			let highestSharedLevel = uiInvestments[0].number === '' ? 0 : uiInvestments[0].number
			for (let i = 1; i < uiInvestments.length; i++) {
				if ((uiInvestments[i].number === '' ? 0 : +uiInvestments[i].number) < highestSharedLevel) {
					highestSharedLevel = uiInvestments[i].number === '' ? 0 : +uiInvestments[i].number
				}
			}
			if (highestSharedLevel < (sdUnlocks[uiInvestments.length][sdUnlocks[uiInvestments.length].length - 1].cost?.price ?? 0)) { // if you don't have them all unlocked already
				for (let i = 0; i < sdUnlocks[uiInvestments.length].length; i++) {
					if ((sdUnlocks[uiInvestments.length][i].cost?.price ?? 0) > highestSharedLevel) {
						highestSharedLevel = sdUnlocks[uiInvestments.length][i].cost?.price ?? 0 // find the next shared level unlock amount
						break
					}
				}
				let sharedUnlockCost = 0
				for (let i = 0; i < uiInvestments.length; i++) {
					if ((uiInvestments[i].number === '' ? Infinity : +uiInvestments[i].number) < highestSharedLevel) {
						sharedUnlockCost += cdCalcUpgradeCost(i, highestSharedLevel - (uiInvestments[i].number === '' ? 0 : +uiInvestments[i].number)) ?? 0
						recUIChangeInvestments(i, highestSharedLevel, null)
					}
				}
				recCDCalculate()
				let rec: Recommendation = {
					investment: InvestmentEnum.All,
					to: highestSharedLevel,
					cost: sharedUnlockCost,
					income: recCalcDataStore.getState().totalIncome,
					score: -Infinity
				}
				if ((calcFilterTime === undefined || calcFilterTime > (rec.cost / cdTotalIncome)) && (rfPercentage === '' || rfPercentage < ((rec.income - cdTotalIncome) / cdTotalIncome))) {
					rec.score = calcUpgradeScore(rec.cost / cdTotalIncome)
					newRecTable.push(rec)
				}
			}
		}
		newRecTable.sort((a, b) => b.score - a.score)
		cdSetRecTable(newRecTable)
	}

	const calcAngels = () => {
		recUIPlanetOverride(uiSaveData())
		setCDAngelNotification(false)
		const newAngelUpgrades = [...recCalcDataStore.getState().angelUpgrades]
		for (let i = 0; i < recUserDataStore.getState().angelUpgradesBought.length; i++) {
			if (!recUserDataStore.getState().angelUpgradesBought[i] && uiNumAngels >= (sdAngelUpgrades[i].cost?.price ?? Infinity)) {
				recUIChangeNumAngels(uiNumAngels - (sdAngelUpgrades[i].cost?.price ?? 0))
				recUIChangeAngelUpgradesBought(i, true, false, false)
				recCDCalculate()
				let delta = recCalcDataStore.getState().totalIncome - cdTotalIncome
				let percent = delta / cdTotalIncome
				newAngelUpgrades[i] = percent
				if (delta > 0) {
					setCDAngelNotification(true)
				}
				// reset calculating state
				recUIChangeAngelUpgradesBought(i, false, false, false)
			} else {
				newAngelUpgrades[i] = null
			}
		}
		setCDAngelUpgrades(newAngelUpgrades)
	}

	const calcSuits = () => {
		recUIPlanetOverride(uiSaveData())
		setCDSuitNotification(false)
		const newSuitUpgrades = { ...recCalcDataStore.getState().suits }
		for (let key in sdSuits) {
			recUIChangeBoughtSuitName(key)
			recCDCalculate()
			let delta = recCalcDataStore.getState().totalIncome - cdTotalIncome
			let percent = delta / cdTotalIncome
			newSuitUpgrades[key] = percent
			if (delta > 0) {
				setCDSuitNotification(true)
			}
		}
		setCDSuits(newSuitUpgrades)
	}

	const calcSuperBadges = () => {
		recUIPlanetOverride(uiSaveData())
		setCDSuperBadgeNotification(false)
		const newSuperBadges = [ ...recCalcDataStore.getState().superBadges ]
		for (let i = 0; i < sdSuperBadges.length; i++) {
			recUIChangeBoughtSuperBadge(i)
			recCDCalculate()
			let delta = recCalcDataStore.getState().totalIncome - cdTotalIncome
			let percent = delta / cdTotalIncome
			newSuperBadges[i] = percent
			if (delta > 0) {
				setCDSuperBadgeNotification(true)
			}
		}
		setCDSuperBadges(newSuperBadges)
	}

	const columnHelper = createColumnHelper<Recommendation>()
	const columns = [
		columnHelper.accessor(rec => rec, {
			header: "Upgrade",
			cell: info => recString(info.getValue())
		}),
		columnHelper.accessor(rec => 'to' in rec ? rec.to : null, {
			header: "To",
			cell: info => info.getValue()
		}),
		columnHelper.accessor(rec => rec.score, {
			id: 'score',
			header: "Upgrade Score (higher = better)*",
			cell: info => formatLargeNumber(info.getValue())
		}),
		columnHelper.accessor(rec => rec.cost, {
			header: "Cost of Upgrade",
			cell: info => formatLargeNumber(info.getValue())
		}),
		columnHelper.accessor(rec => rec.cost, {
			header: "Cost of Upgrade in Time",
			cell: info => formatTime(info.getValue() / cdTotalIncome)
		}),
		columnHelper.accessor(rec => rec.income, {
			header: "Increase in $ / Second",
			cell: info => formatLargeNumber(info.getValue() - cdTotalIncome)
		}),
		columnHelper.accessor(rec => rec.income, {
			header: "% Increase in $ / Second",
			cell: info => formatLargeNumber((info.getValue() - cdTotalIncome) * 100 / cdTotalIncome) + '%'
		}),
		columnHelper.accessor(rec => rec, {
			header: 'Apply',
			cell: info => <Button onClick={() => applyRecommendation(info.getValue())}>Apply This Row</Button>,
			enableSorting: false
		})
	]
	const table = useReactTable({
		columns,
		data: cdRecTable,
		state: {
			sorting,
		},
		getCoreRowModel: getCoreRowModel(),
		onSortingChange: setSorting,
		getSortedRowModel: getSortedRowModel(),
	})

	return (
		<div>
			{(appliedMessage !== null || appliedCount !== null) ? (
				<div className='fixed top-4 right-4 z-50'>
					<div className='rounded-md bg-slate-800 text-white px-4 py-2 shadow-md max-w-xs flex items-start gap-2'>
						<div className='flex-1 break-words'>
							{appliedMessage ?? `Applied ${appliedCount} upgrade${appliedCount === 1 ? '' : 's'}`}
						</div>
						<button aria-label='Close' className='text-white opacity-80 hover:opacity-100 ml-2' onClick={() => {
							if (toastTimer) clearTimeout(toastTimer)
							setAppliedMessage(null)
							setAppliedCount(null)
							setToastTimer(null)
						}}>✕</button>
					</div>
				</div>
			) : null}
			{cdRecTable.length === 0 ? null :
				<>
					<div className='w-full flex-col justify-center mb-2'>
						<h1 className='text-2xl w-full text-center font-semibold'>Recommendation: Buy {recString(cdRecTable[0]) + ('to' in cdRecTable[0] ? ` to level ${cdRecTable[0].to}.` : ' Cash Upgrade.')}</h1>
						<div className='w-full flex justify-center'>
							<div className='flex gap-2'>
								<Button onClick={() => applyRecommendation(cdRecTable[0])}>Apply This Recommendation</Button>
								<Button onClick={applyAllZeroTime} disabled={applyingAll}>
									{applyingAll ? 'Applying...' : 'Apply All Zero-Time Upgrades'}
								</Button>
							</div>
						</div>
					</div>
					<Table>
						<TableHeader>
							{table.getHeaderGroups().map(headerGroup => (
								<TableRow key={headerGroup.id}>
									{headerGroup.headers.map(header => (
										<TableHead key={header.id} onClick={header.column.getToggleSortingHandler()} className={header.column.getCanSort() ? 'cursor-pointer select-none' : 'cursor-disabled select-none'}>
											{header.isPlaceholder
											? null
											: flexRender(
												header.column.columnDef.header,
												header.getContext()
											)}
											{{
												asc: <BsChevronUp className='inline-flex'/>,
												desc: <BsChevronDown className='inline-flex'/>,
											}[header.column.getIsSorted() as string] ?? null}
										</TableHead>
									))}
								</TableRow>
							))}
						</TableHeader>
						<TableBody>
							{table.getRowModel().rows.map(row => (
								<TableRow key={row.id}>
									{row.getVisibleCells().map(cell => (
										<TableCell key={cell.id}>
											{flexRender(cell.column.columnDef.cell, cell.getContext())}
										</TableCell>
									))}
								</TableRow>
							))}
						</TableBody>
					</Table>
				</>
			}
		</div>
	)
}