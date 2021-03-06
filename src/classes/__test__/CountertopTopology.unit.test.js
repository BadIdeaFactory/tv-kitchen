import CountertopTopology from '../CountertopTopology'
import CountertopStation from '../CountertopStation'
import CountertopStream from '../CountertopStream'

import {
	generateMockAppliance,
	normalizeStreams,
} from '../../tools/utils/jest'

describe('CountertopTopology #unit', () => {
	describe('constructor', () => {
		it('Should generate no streams if provided no stations', () => {
			const topology = new CountertopTopology()
			expect(topology.streams).toEqual([])
		})
	})

	describe('extendStreamsByStation', () => {
		it('Should extend streams correctly', () => {
			const ApplianceA = generateMockAppliance({
				inputTypes: [],
				outputTypes: ['foo'],
			})
			const ApplianceB = generateMockAppliance({
				inputTypes: ['foo'],
				outputTypes: ['bar'],
			})
			const stationA = new CountertopStation(ApplianceA)
			const stationB = new CountertopStation(ApplianceB)
			const streamA = new CountertopStream(stationA)
			const streams = CountertopTopology.extendStreamsByStation([streamA], stationB)
			expect(streams.length).toBe(1)
		})
		it('Should not extend streams if the station is not related', () => {
			const ApplianceA = generateMockAppliance({
				inputTypes: [],
				outputTypes: ['foo'],
			})
			const ApplianceB = generateMockAppliance({
				inputTypes: ['baz'],
				outputTypes: ['bar'],
			})
			const stationA = new CountertopStation(ApplianceA)
			const stationB = new CountertopStation(ApplianceB)
			const streamA = new CountertopStream(stationA)
			const streams = CountertopTopology.extendStreamsByStation([streamA], stationB)
			expect(streams.length).toBe(0)
		})
	})

	describe('generateStreams', () => {
		it('Should generate the correct streams', () => {
			const ApplianceA = generateMockAppliance({
				inputTypes: [],
				outputTypes: ['foo'],
			})
			const ApplianceB = generateMockAppliance({
				inputTypes: ['foo'],
				outputTypes: ['bar'],
			})
			const stationA = new CountertopStation(ApplianceA)
			const stationB = new CountertopStation(ApplianceB)
			const stations = [stationA, stationB]
			const streams = CountertopTopology.generateStreams(stations)
			expect(normalizeStreams(streams, stations)).toMatchSnapshot()
		})
		it('Should not generate streams for stations with no inputs', () => {
			const ApplianceA = generateMockAppliance({
				inputTypes: [],
				outputTypes: ['foo'],
			})
			const ApplianceB = generateMockAppliance({
				inputTypes: ['baz'],
				outputTypes: ['bar'],
			})
			const stationA = new CountertopStation(ApplianceA)
			const stationB = new CountertopStation(ApplianceB)
			const stations = [stationA, stationB]
			const streams = CountertopTopology.generateStreams(stations)
			expect(normalizeStreams(streams, stations)).toMatchSnapshot()
		})
	})

	describe('generateSourceStreams', () => {
		it('Should generate streams for any source stations', () => {
			const ApplianceA = generateMockAppliance({
				inputTypes: [],
				outputTypes: ['foo'],
			})
			const ApplianceB = generateMockAppliance({
				inputTypes: ['baz'],
				outputTypes: ['bar'],
			})
			const stationA = new CountertopStation(ApplianceA)
			const stationB = new CountertopStation(ApplianceB)
			const stations = [stationA, stationB]
			const streams = CountertopTopology.generateSourceStreams(stations)
			expect(normalizeStreams(streams, stations)).toMatchSnapshot()
		})
	})
})
