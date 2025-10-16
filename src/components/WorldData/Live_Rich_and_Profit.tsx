import { Currency, InvestmentEnum, UpgradeType } from '../Types'

export default {
	angelScale: 45,
	hasMegaTickets: true,
	ignorePlatinumBoost: true,
	investments: [
		{ name: "XO Skeletons", startingNumber: 1, cost: 0.91, power: 1.1, profit: 4, speed: 1 },
		{ name: "Cleaning Droids", startingNumber: 0, cost: 20, power: 3, profit: 17, speed: 420 },
		{ name: "Spicy Sand Worms", startingNumber: 0, cost: 30, power: 2, profit: 25, speed: 540 },
		{ name: "Red Shirts", startingNumber: 0, cost: 50, power: 1.5, profit: 33, speed: 840 },
		{ name: "Barf Buckets", startingNumber: 0, cost: 100, power: 1.05, profit: 2500, speed: 1200 },
		{ name: "Space Gates", startingNumber: 0, cost: 200, power: 1.05, profit: 5000, speed: 2400 },
		{ name: "Calling Cards", startingNumber: 0, cost: 400, power: 1.05, profit: 8000, speed: 3600 },
		{ name: "Bug Spray", startingNumber: 0, cost: 1000, power: 1.05, profit: 10000, speed: 4800 },
		{ name: "Space Buddies", startingNumber: 0, cost: 19550717100000, power: 6, profit: 1000000, speed: 25200 }
	],
	unlocks: [
		// XO Skeletons (triggers when XO Skeletons reach the listed level)
		[
			{ investment: 4, type: UpgradeType.Speed, amount: 50, cost: { price: 25, currency: Currency.Levels } },
			{ investment: 5, type: UpgradeType.Speed, amount: 40, cost: { price: 50, currency: Currency.Levels } },
			{ investment: 6, type: UpgradeType.Speed, amount: 40, cost: { price: 75, currency: Currency.Levels } },
			{ investment: 7, type: UpgradeType.Speed, amount: 25, cost: { price: 100, currency: Currency.Levels } },
			{ investment: InvestmentEnum.All, type: UpgradeType.Speed, amount: 1.3999916000504, cost: { price: 150, currency: Currency.Levels } },
			{ investment: InvestmentEnum.All, type: UpgradeType.Speed, amount: 1.3999916000504, cost: { price: 225, currency: Currency.Levels } },
			{ investment: InvestmentEnum.All, type: UpgradeType.Profit, amount: 8, cost: { price: 250, currency: Currency.Levels } },
			{ investment: InvestmentEnum.All, type: UpgradeType.Profit, amount: 2, cost: { price: 600, currency: Currency.Levels } },
			{ investment: InvestmentEnum.All, type: UpgradeType.Profit, amount: 7, cost: { price: 625, currency: Currency.Levels } },
			{ investment: InvestmentEnum.All, type: UpgradeType.Profit, amount: 7, cost: { price: 700, currency: Currency.Levels } },
			{ investment: InvestmentEnum.All, type: UpgradeType.Profit, amount: 7, cost: { price: 830, currency: Currency.Levels } },
			{ investment: 0, type: UpgradeType.Profit, amount: 999, cost: { price: 911, currency: Currency.Levels } },
			{ investment: InvestmentEnum.All, type: UpgradeType.Profit, amount: 2, cost: { price: 1000, currency: Currency.Levels } },
			{ investment: 0, type: UpgradeType.Profit, amount: 4, cost: { price: 1300, currency: Currency.Levels } }
		],
		// Cleaning Droids
		[
			{ investment: 1, type: UpgradeType.Speed, amount: 2, cost: { price: 24, currency: Currency.Levels } },
			{ investment: InvestmentEnum.All, type: UpgradeType.Profit, amount: 2, cost: { price: 36, currency: Currency.Levels } },
			{ investment: 1, type: UpgradeType.Profit, amount: 5, cost: { price: 87, currency: Currency.Levels } },
			{ investment: 1, type: UpgradeType.Speed, amount: 5, cost: { price: 115, currency: Currency.Levels } }
		],
		// Spicy Sand Worms
		[
			{ investment: 2, type: UpgradeType.Speed, amount: 2, cost: { price: 36, currency: Currency.Levels } },
			{ investment: InvestmentEnum.All, type: UpgradeType.Profit, amount: 2, cost: { price: 70, currency: Currency.Levels } },
			{ investment: 2, type: UpgradeType.Profit, amount: 2, cost: { price: 125, currency: Currency.Levels } },
			{ investment: 2, type: UpgradeType.Speed, amount: 5, cost: { price: 180, currency: Currency.Levels } }
		],
		// Red Shirts
		[
			{ investment: 3, type: UpgradeType.Speed, amount: 2, cost: { price: 60, currency: Currency.Levels } },
			{ investment: InvestmentEnum.All, type: UpgradeType.Profit, amount: 2, cost: { price: 100, currency: Currency.Levels } },
			{ investment: 3, type: UpgradeType.Speed, amount: 2, cost: { price: 220, currency: Currency.Levels } },
			{ investment: 3, type: UpgradeType.Speed, amount: 4, cost: { price: 310, currency: Currency.Levels } }
		],
		// Barf Buckets
		[
			{ investment: 4, type: UpgradeType.Profit, amount: 5, cost: { price: 260, currency: Currency.Levels } },
			{ investment: InvestmentEnum.All, type: UpgradeType.Profit, amount: 2, cost: { price: 700, currency: Currency.Levels } },
			{ investment: InvestmentEnum.All, type: UpgradeType.Profit, amount: 3, cost: { price: 2550, currency: Currency.Levels } }
		],
		// Space Gates
		[
			{ investment: 5, type: UpgradeType.Profit, amount: 7, cost: { price: 300, currency: Currency.Levels } },
			{ investment: InvestmentEnum.All, type: UpgradeType.Profit, amount: 2, cost: { price: 940, currency: Currency.Levels } },
			{ investment: InvestmentEnum.All, type: UpgradeType.Profit, amount: 3, cost: { price: 2575, currency: Currency.Levels } }
		],
		// Calling Cards
		[
			{ investment: InvestmentEnum.All, type: UpgradeType.Profit, amount: 2, cost: { price: 10, currency: Currency.Levels } },
			{ investment: 6, type: UpgradeType.Profit, amount: 10, cost: { price: 300, currency: Currency.Levels } },
			{ investment: InvestmentEnum.All, type: UpgradeType.Profit, amount: 2, cost: { price: 640, currency: Currency.Levels } },
			{ investment: InvestmentEnum.All, type: UpgradeType.Profit, amount: 3, cost: { price: 2585, currency: Currency.Levels } }
		],
		// Bug Spray
		[
			{ investment: 7, type: UpgradeType.Profit, amount: 15, cost: { price: 325, currency: Currency.Levels } },
			{ investment: InvestmentEnum.All, type: UpgradeType.Profit, amount: 3, cost: { price: 2600, currency: Currency.Levels } }
		],
		// Space Buddies
		[
			{ investment: InvestmentEnum.All, type: UpgradeType.Profit, amount: 7, cost: { price: 5, currency: Currency.Levels } },
			{ investment: 8, type: UpgradeType.Profit, amount: 999, cost: { price: 15, currency: Currency.Levels } },
			{ investment: 8, type: UpgradeType.Profit, amount: 7, cost: { price: 40, currency: Currency.Levels } },
			{ investment: 8, type: UpgradeType.Speed, amount: 5, cost: { price: 48, currency: Currency.Levels } },
			{ investment: 8, type: UpgradeType.Profit, amount: 33, cost: { price: 65, currency: Currency.Levels } }
		],
		// Shared / Everything
		[
			{ investment: InvestmentEnum.All, type: UpgradeType.Speed, amount: 4, cost: { price: 1, currency: Currency.Levels } },
			{ investment: InvestmentEnum.All, type: UpgradeType.Speed, amount: 3.50005250078, cost: { price: 16, currency: Currency.Levels } },
			{ investment: InvestmentEnum.All, type: UpgradeType.Profit, amount: 7, cost: { price: 20, currency: Currency.Levels } },
			{ investment: InvestmentEnum.All, type: UpgradeType.Profit, amount: 7, cost: { price: 25, currency: Currency.Levels } },
			{ investment: InvestmentEnum.All, type: UpgradeType.Profit, amount: 7, cost: { price: 32, currency: Currency.Levels } },
			{ investment: InvestmentEnum.All, type: UpgradeType.Profit, amount: 2, cost: { price: 44, currency: Currency.Levels } },
			{ investment: InvestmentEnum.All, type: UpgradeType.Profit, amount: 9, cost: { price: 62, currency: Currency.Levels } },
			{ investment: InvestmentEnum.All, type: UpgradeType.Profit, amount: 9, cost: { price: 67, currency: Currency.Levels } },
			{ investment: InvestmentEnum.All, type: UpgradeType.Profit, amount: 9, cost: { price: 72, currency: Currency.Levels } },
			{ investment: InvestmentEnum.All, type: UpgradeType.Profit, amount: 9, cost: { price: 77, currency: Currency.Levels } }
		]
	],
	cashUpgrades: [
		{ investment: InvestmentEnum.All, type: UpgradeType.Profit, amount: 2, cost: { price: 400, currency: Currency.Cash } },
		{ investment: 4, type: UpgradeType.Profit, amount: 4, cost: { price: 800, currency: Currency.Cash } },
		{ investment: InvestmentEnum.All, type: UpgradeType.Profit, amount: 2, cost: { price: 499999, currency: Currency.Cash } },
		{ investment: 5, type: UpgradeType.Profit, amount: 8, cost: { price: 999999, currency: Currency.Cash } },
		{ investment: InvestmentEnum.All, type: UpgradeType.Profit, amount: 2, cost: { price: 9.999e6, currency: Currency.Cash } },
		{ investment: 6, type: UpgradeType.Profit, amount: 16, cost: { price: 2.9999e7, currency: Currency.Cash } },
		{ investment: InvestmentEnum.All, type: UpgradeType.Profit, amount: 2, cost: { price: 9.9999e7, currency: Currency.Cash } },
		{ investment: 7, type: UpgradeType.Profit, amount: 32, cost: { price: 2.39999e8, currency: Currency.Cash } },
		{ investment: InvestmentEnum.All, type: UpgradeType.Profit, amount: 3, cost: { price: 3.999e9, currency: Currency.Cash } },
		{ investment: 1, type: UpgradeType.Profit, amount: 150, cost: { price: 2.9999e10, currency: Currency.Cash } },
		{ investment: 2, type: UpgradeType.Profit, amount: 100, cost: { price: 2.9999e10, currency: Currency.Cash } },
		{ investment: 3, type: UpgradeType.Profit, amount: 100, cost: { price: 2.9999e10, currency: Currency.Cash } },
		{ investment: 1, type: UpgradeType.Profit, amount: 200, cost: { price: 1.39999e11, currency: Currency.Cash } },
		{ investment: 2, type: UpgradeType.Profit, amount: 200, cost: { price: 1.39999e11, currency: Currency.Cash } },
		{ investment: 3, type: UpgradeType.Profit, amount: 150, cost: { price: 1.39999e11, currency: Currency.Cash } },
		{ investment: 1, type: UpgradeType.Profit, amount: 200, cost: { price: 4.99999e11, currency: Currency.Cash } },
		{ investment: 2, type: UpgradeType.Profit, amount: 200, cost: { price: 4.99999e11, currency: Currency.Cash } },
		{ investment: 3, type: UpgradeType.Profit, amount: 200, cost: { price: 4.99999e11, currency: Currency.Cash } },
		{ investment: 4, type: UpgradeType.Profit, amount: 8, cost: { price: 9.9999e13, currency: Currency.Cash } },
		{ investment: 4, type: UpgradeType.Profit, amount: 4, cost: { price: 5.99999e14, currency: Currency.Cash } },
		{ investment: 5, type: UpgradeType.Profit, amount: 2.5, cost: { price: 1.199e15, currency: Currency.Cash } },
		{ investment: 5, type: UpgradeType.Profit, amount: 3, cost: { price: 3.499e15, currency: Currency.Cash } },
		{ investment: 6, type: UpgradeType.Profit, amount: 1.5, cost: { price: 1.2499e16, currency: Currency.Cash } },
		{ investment: 7, type: UpgradeType.Profit, amount: 2, cost: { price: 1.9999e16, currency: Currency.Cash } },
		{ investment: 6, type: UpgradeType.Profit, amount: 1.5, cost: { price: 9.9999e16, currency: Currency.Cash } },
		{ investment: 7, type: UpgradeType.Profit, amount: 2, cost: { price: 2.99999e17, currency: Currency.Cash } },
		{ investment: 4, type: UpgradeType.Profit, amount: 7, cost: { price: 4.99999e17, currency: Currency.Cash } },
		{ investment: 4, type: UpgradeType.Profit, amount: 2, cost: { price: 4.999e18, currency: Currency.Cash } },
		{ investment: 5, type: UpgradeType.Profit, amount: 1.5, cost: { price: 1.9999e19, currency: Currency.Cash } },
		{ investment: 8, type: UpgradeType.Profit, amount: 9999, cost: { price: 9.9999e19, currency: Currency.Cash } },
		{ investment: 1, type: UpgradeType.Profit, amount: 5, cost: { price: 1.499e21, currency: Currency.Cash } },
		{ investment: 2, type: UpgradeType.Profit, amount: 5, cost: { price: 2.499e21, currency: Currency.Cash } },
		{ investment: 3, type: UpgradeType.Profit, amount: 5, cost: { price: 3.499e21, currency: Currency.Cash } },
		{ investment: 7, type: UpgradeType.Profit, amount: 3, cost: { price: 4.999e27, currency: Currency.Cash } },
		{ investment: 6, type: UpgradeType.Profit, amount: 3, cost: { price: 5.9999e28, currency: Currency.Cash } },
		{ investment: 5, type: UpgradeType.Profit, amount: 3, cost: { price: 9.999e30, currency: Currency.Cash } },
		{ investment: 4, type: UpgradeType.Profit, amount: 3, cost: { price: 3.9999e31, currency: Currency.Cash } },
		{ investment: 3, type: UpgradeType.Profit, amount: 3, cost: { price: 2.999e33, currency: Currency.Cash } },
		{ investment: 2, type: UpgradeType.Profit, amount: 3, cost: { price: 7.999e33, currency: Currency.Cash } },
		{ investment: 0, type: UpgradeType.Profit, amount: 999, cost: { price: 1.999e36, currency: Currency.Cash } },
		{ investment: 1, type: UpgradeType.Profit, amount: 3, cost: { price: 2.999e36, currency: Currency.Cash } },
		{ investment: InvestmentEnum.All, type: UpgradeType.Profit, amount: 3, cost: { price: 7.9999e40, currency: Currency.Cash } },
		{ investment: InvestmentEnum.All, type: UpgradeType.Profit, amount: 5, cost: { price: 3.99999e44, currency: Currency.Cash } },
		{ investment: 8, type: UpgradeType.Profit, amount: 5, cost: { price: 9.999e45, currency: Currency.Cash } },
		{ investment: 0, type: UpgradeType.Profit, amount: 3, cost: { price: 3.999e46, currency: Currency.Cash } },
		{ investment: 7, type: UpgradeType.Profit, amount: 3, cost: { price: 1.999e48, currency: Currency.Cash } },
		{ investment: 1, type: UpgradeType.Profit, amount: 2, cost: { price: 3.999e48, currency: Currency.Cash } },
		{ investment: 2, type: UpgradeType.Profit, amount: 2, cost: { price: 7.999e48, currency: Currency.Cash } },
		{ investment: 3, type: UpgradeType.Profit, amount: 2, cost: { price: 2.9999e49, currency: Currency.Cash } },
		{ investment: 4, type: UpgradeType.Profit, amount: 13, cost: { price: 6.9999e49, currency: Currency.Cash } },
		{ investment: 5, type: UpgradeType.Profit, amount: 18, cost: { price: 6.9999e52, currency: Currency.Cash } },
		{ investment: 6, type: UpgradeType.Profit, amount: 19, cost: { price: 1.49999e53, currency: Currency.Cash } }
	],
	angelUpgrades: [
		{ investment: InvestmentEnum.All, type: UpgradeType.Profit, amount: 3, cost: { price: 100000, currency: Currency.Angels } },
		{ investment: 0, type: UpgradeType.Profit, amount: 999, cost: { price: 200000, currency: Currency.Angels } },
		{ investment: 1, type: UpgradeType.Profit, amount: 999, cost: { price: 50000000, currency: Currency.Angels } },
		{ investment: InvestmentEnum.All, type: UpgradeType.Profit, amount: 6, cost: { price: 2000000000, currency: Currency.Angels } },
		{ investment: 2, type: UpgradeType.Profit, amount: 7, cost: { price: 6000000000, currency: Currency.Angels } },
		{ investment: InvestmentEnum.All, type: UpgradeType.Profit, amount: 6, cost: { price: 2000000000000, currency: Currency.Angels } },
		{ investment: 3, type: UpgradeType.Profit, amount: 666, cost: { price: 6000000000000, currency: Currency.Angels } },
		{ investment: InvestmentEnum.All, type: UpgradeType.Profit, amount: 6, cost: { price: 5000000000000000, currency: Currency.Angels } },
		{ investment: 4, type: UpgradeType.Profit, amount: 99, cost: { price: 15000000000000000, currency: Currency.Angels } },
		{ investment: InvestmentEnum.All, type: UpgradeType.Profit, amount: 6, cost: { price: 5000000000000000000, currency: Currency.Angels } },
		{ investment: 8, type: UpgradeType.Profit, amount: 999, cost: { price: 10000000000000000000, currency: Currency.Angels } },
		{ investment: InvestmentEnum.All, type: UpgradeType.Profit, amount: 6, cost: { price: 8e+21, currency: Currency.Angels } }
	],
	managerUpgrades: []
}