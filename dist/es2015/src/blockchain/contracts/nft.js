var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import BaseContract from './base';
class NftContract extends BaseContract {
    constructor(api, tableCodeConfig) {
        super(api, tableCodeConfig, 'nft');
    }
    getObjectsByOwner(owner) {
        return __awaiter(this, void 0, void 0, function* () {
            const q = {
                table: 'pieces',
                lower_bound: owner,
                upper_bound: owner,
                limit: 1000,
                index_position: 2,
                key_type: 'i64',
                getAllRows: true,
            };
            const { rows } = yield this.getTableRows(q);
            return rows;
        });
    }
    getAllObjects() {
        return __awaiter(this, void 0, void 0, function* () {
            const q = {
                table: 'objects',
                limit: 100,
                lower_bound: 0,
                getAllRows: true,
                parseMetaAsJson: true,
                parseKeysAsJson: ['images'],
                defaultJsonValues: {
                    images: () => [],
                },
            };
            const { rows } = yield this.getTableRows(q);
            return rows;
        });
    }
    getObjectsById(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const q = {
                table: 'objects',
                limit: 1,
                lower_bound: id,
                upper_bound: id,
                index_position: 0,
                key_type: 'i64',
                parseMetaAsJson: true,
                parseKeysAsJson: ['images'],
                defaultJsonValues: {
                    images: () => [],
                },
            };
            const { rows } = yield this.getTableRows(q);
            return rows;
        });
    }
    getMarket() {
        return __awaiter(this, void 0, void 0, function* () {
            const q = {
                table: 'market',
                limit: 1000,
                lower_bound: 0,
                getAllRows: true,
                parseMetaAsJson: true,
            };
            const { rows } = yield this.getTableRows(q);
            return rows;
        });
    }
    getMarketObjectsById(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const q = {
                table: 'market',
                limit: 1,
                lower_bound: id,
                upper_bound: id,
                index_position: 0,
                key_type: 'i64',
                parseMetaAsJson: true,
            };
            const { rows } = yield this.getTableRows(q);
            return rows;
        });
    }
    fetchRequestsWithIndexPosition(username, indexPosition) {
        return __awaiter(this, void 0, void 0, function* () {
            const q = {
                table: 'requests',
                lower_bound: username,
                upper_bound: username,
                limit: 1000,
                index_position: indexPosition,
                key_type: 'i64',
                parseKeysAsJson: ['delivery_to', 'meta'],
                getAllRows: true,
            };
            const { rows } = yield this.getTableRows(q);
            return rows;
        });
    }
    fetchRequests(username) {
        return __awaiter(this, void 0, void 0, function* () {
            const [asBuyer, asSeller] = yield Promise.all([
                this.fetchRequestsWithIndexPosition(username, 2),
                this.fetchRequestsWithIndexPosition(username, 3),
            ]);
            return [...asBuyer, ...asSeller];
        });
    }
}
export default NftContract;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibmZ0LmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vdHMvc3JjL2Jsb2NrY2hhaW4vY29udHJhY3RzL25mdC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7QUFHQSxPQUFPLFlBQTZCLE1BQU0sUUFBUSxDQUFBO0FBd0VsRCxNQUFNLFdBQVksU0FBUSxZQUFZO0lBQ3BDLFlBQVksR0FBWSxFQUFFLGVBQWdDO1FBQ3hELEtBQUssQ0FBQyxHQUFHLEVBQUUsZUFBZSxFQUFFLEtBQUssQ0FBQyxDQUFBO0lBQ3BDLENBQUM7SUFFSyxpQkFBaUIsQ0FBQyxLQUFrQjs7WUFDeEMsTUFBTSxDQUFDLEdBQWtCO2dCQUN2QixLQUFLLEVBQUUsUUFBUTtnQkFDZixXQUFXLEVBQUUsS0FBSztnQkFDbEIsV0FBVyxFQUFFLEtBQUs7Z0JBQ2xCLEtBQUssRUFBRSxJQUFJO2dCQUNYLGNBQWMsRUFBRSxDQUFDO2dCQUNqQixRQUFRLEVBQUUsS0FBSztnQkFDZixVQUFVLEVBQUUsSUFBSTthQUNqQixDQUFBO1lBQ0QsTUFBTSxFQUFDLElBQUksRUFBQyxHQUFHLE1BQU0sSUFBSSxDQUFDLFlBQVksQ0FBaUIsQ0FBQyxDQUFDLENBQUE7WUFFekQsT0FBTyxJQUFJLENBQUM7UUFDZCxDQUFDO0tBQUE7SUFFSyxhQUFhOztZQUNqQixNQUFNLENBQUMsR0FBa0I7Z0JBQ3ZCLEtBQUssRUFBRSxTQUFTO2dCQUNoQixLQUFLLEVBQUUsR0FBRztnQkFDVixXQUFXLEVBQUUsQ0FBQztnQkFDZCxVQUFVLEVBQUUsSUFBSTtnQkFDaEIsZUFBZSxFQUFFLElBQUk7Z0JBQ3JCLGVBQWUsRUFBRSxDQUFDLFFBQVEsQ0FBQztnQkFDM0IsaUJBQWlCLEVBQUU7b0JBQ2pCLE1BQU0sRUFBRSxHQUFHLEVBQUUsQ0FBQyxFQUFFO2lCQUNqQjthQUNGLENBQUE7WUFDRCxNQUFNLEVBQUMsSUFBSSxFQUFDLEdBQUcsTUFBTSxJQUFJLENBQUMsWUFBWSxDQUFZLENBQUMsQ0FBQyxDQUFBO1lBRXBELE9BQU8sSUFBSSxDQUFDO1FBQ2QsQ0FBQztLQUFBO0lBRUssY0FBYyxDQUFDLEVBQVU7O1lBQzdCLE1BQU0sQ0FBQyxHQUFrQjtnQkFDdkIsS0FBSyxFQUFFLFNBQVM7Z0JBQ2hCLEtBQUssRUFBRSxDQUFDO2dCQUNSLFdBQVcsRUFBRSxFQUFFO2dCQUNmLFdBQVcsRUFBRSxFQUFFO2dCQUNmLGNBQWMsRUFBRSxDQUFDO2dCQUNqQixRQUFRLEVBQUUsS0FBSztnQkFDZixlQUFlLEVBQUUsSUFBSTtnQkFDckIsZUFBZSxFQUFFLENBQUMsUUFBUSxDQUFDO2dCQUMzQixpQkFBaUIsRUFBRTtvQkFDakIsTUFBTSxFQUFFLEdBQUcsRUFBRSxDQUFDLEVBQUU7aUJBQ2pCO2FBQ0YsQ0FBQTtZQUNELE1BQU0sRUFBQyxJQUFJLEVBQUMsR0FBRyxNQUFNLElBQUksQ0FBQyxZQUFZLENBQVksQ0FBQyxDQUFDLENBQUE7WUFFcEQsT0FBTyxJQUFJLENBQUM7UUFDZCxDQUFDO0tBQUE7SUFFSyxTQUFTOztZQUNiLE1BQU0sQ0FBQyxHQUFrQjtnQkFDdkIsS0FBSyxFQUFFLFFBQVE7Z0JBQ2YsS0FBSyxFQUFFLElBQUk7Z0JBQ1gsV0FBVyxFQUFFLENBQUM7Z0JBQ2QsVUFBVSxFQUFFLElBQUk7Z0JBQ2hCLGVBQWUsRUFBRSxJQUFJO2FBQ3RCLENBQUE7WUFDRCxNQUFNLEVBQUMsSUFBSSxFQUFDLEdBQUcsTUFBTSxJQUFJLENBQUMsWUFBWSxDQUFrQixDQUFDLENBQUMsQ0FBQTtZQUUxRCxPQUFPLElBQUksQ0FBQztRQUNkLENBQUM7S0FBQTtJQUVLLG9CQUFvQixDQUFDLEVBQVU7O1lBQ25DLE1BQU0sQ0FBQyxHQUFrQjtnQkFDdkIsS0FBSyxFQUFFLFFBQVE7Z0JBQ2YsS0FBSyxFQUFFLENBQUM7Z0JBQ1IsV0FBVyxFQUFFLEVBQUU7Z0JBQ2YsV0FBVyxFQUFFLEVBQUU7Z0JBQ2YsY0FBYyxFQUFFLENBQUM7Z0JBQ2pCLFFBQVEsRUFBRSxLQUFLO2dCQUNmLGVBQWUsRUFBRSxJQUFJO2FBQ3RCLENBQUE7WUFDRCxNQUFNLEVBQUMsSUFBSSxFQUFDLEdBQUcsTUFBTSxJQUFJLENBQUMsWUFBWSxDQUFrQixDQUFDLENBQUMsQ0FBQTtZQUUxRCxPQUFPLElBQUksQ0FBQztRQUNkLENBQUM7S0FBQTtJQUVLLDhCQUE4QixDQUFDLFFBQXFCLEVBQUUsYUFBcUI7O1lBQy9FLE1BQU0sQ0FBQyxHQUFrQjtnQkFDdkIsS0FBSyxFQUFFLFVBQVU7Z0JBQ2pCLFdBQVcsRUFBRSxRQUFRO2dCQUNyQixXQUFXLEVBQUUsUUFBUTtnQkFDckIsS0FBSyxFQUFFLElBQUk7Z0JBQ1gsY0FBYyxFQUFFLGFBQWE7Z0JBQzdCLFFBQVEsRUFBRSxLQUFLO2dCQUNmLGVBQWUsRUFBRSxDQUFDLGFBQWEsRUFBRSxNQUFNLENBQUM7Z0JBQ3hDLFVBQVUsRUFBRSxJQUFJO2FBQ2pCLENBQUE7WUFDRCxNQUFNLEVBQUMsSUFBSSxFQUFDLEdBQUcsTUFBTSxJQUFJLENBQUMsWUFBWSxDQUFtQixDQUFDLENBQUMsQ0FBQTtZQUUzRCxPQUFPLElBQUksQ0FBQztRQUNkLENBQUM7S0FBQTtJQUVLLGFBQWEsQ0FBQyxRQUFxQjs7WUFDdkMsTUFBTSxDQUFDLE9BQU8sRUFBRSxRQUFRLENBQUMsR0FBRyxNQUFNLE9BQU8sQ0FBQyxHQUFHLENBQUM7Z0JBQzVDLElBQUksQ0FBQyw4QkFBOEIsQ0FBQyxRQUFRLEVBQUUsQ0FBQyxDQUFDO2dCQUNoRCxJQUFJLENBQUMsOEJBQThCLENBQUMsUUFBUSxFQUFFLENBQUMsQ0FBQzthQUNqRCxDQUFDLENBQUM7WUFFSCxPQUFPLENBQUMsR0FBRyxPQUFPLEVBQUUsR0FBRyxRQUFRLENBQUMsQ0FBQztRQUNuQyxDQUFDO0tBQUE7Q0FDRjtBQUVELGVBQWUsV0FBVyxDQUFBIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgQWNjb3VudE5hbWUgfSBmcm9tICcuLi8uLi9lb3MvdHlwZXMnXG5pbXBvcnQgUmVhZEFwaSBmcm9tICcuLi9yZWFkQXBpJ1xuaW1wb3J0IHsgVGFibGVDb2RlQ29uZmlnIH0gZnJvbSAnLi4vdHlwZXMnXG5pbXBvcnQgQmFzZUNvbnRyYWN0LCB7VGFibGVSb3dzQXJnc30gZnJvbSAnLi9iYXNlJ1xuXG5leHBvcnQgaW50ZXJmYWNlIE5mdE9iamVjdCB7XG4gIGNhdGVnb3J5OiBzdHJpbmdcbiAgY3JlYXRvcjogc3RyaW5nXG4gIGRlc2NyaXB0aW9uOiBzdHJpbmdcbiAgaWQ6IG51bWJlclxuICBpbWFnZXM6IHN0cmluZ1tdXG4gIGlwbnM6IHN0cmluZ1xuICBtZXRhOiBSZWNvcmQ8c3RyaW5nLCB1bmtub3duPixcbiAgdGl0bGU6IHN0cmluZ1xuICB0b3RhbF9waWVjZXM6IG51bWJlclxufVxuXG5leHBvcnQgaW50ZXJmYWNlIE5mdFBpZWNlT2JqZWN0IHtcbiAgaWQ6IG51bWJlclxuICBvYmplY3RfaWQ6IG51bWJlclxuICBvd25lcjogc3RyaW5nLFxuICBwaWVjZXM6IG51bWJlclxuICBkYXlfZmluaXNoOiBudW1iZXJcbiAgZGF5X3N0YXJ0OiBudW1iZXJcbn1cblxuZXhwb3J0IGludGVyZmFjZSBEZWxpdmVyeVJlcXVlc3Qge1xuICB0eXBlOiBzdHJpbmdcbiAgcGxhY2Vob2xkZXI6IHN0cmluZ1xufVxuXG5leHBvcnQgdHlwZSBEZWxpdmVyeVJlcXVlc3RGaWxsZWQgPSBEZWxpdmVyeVJlcXVlc3QgJiB7XG4gIHZhbHVlOiBzdHJpbmdcbn1cblxuZXhwb3J0IHR5cGUgRGVsaXZlcnlSZXF1ZXN0UGVyc29uYWxEYXRhID0ge1xuICBwZXJzb25hbERhdGFJZD86IHN0cmluZ1xufVxuXG5leHBvcnQgaW50ZXJmYWNlIE5mdE1hcmtldE9iamVjdCB7XG4gIGJhc2VfcGllY2VfcHJpY2U6IHN0cmluZ1xuICBibG9ja2VkX3BpZWNlczogbnVtYmVyXG4gIGRheV9maW5pc2g6IG51bWJlclxuICBkYXlfc3RhcnQ6IG51bWJlclxuICBpZDogbnVtYmVyXG4gIG1ldGE6IHtkZWxpdmVyeV9yZXF1ZXN0OiBEZWxpdmVyeVJlcXVlc3RbXX1cbiAgbWluX3BpZWNlX3ByaWNlOiBzdHJpbmdcbiAgb2JqZWN0X2lkOiBudW1iZXJcbiAgcmVtYWluX3BpZWNlczogbnVtYmVyXG4gIHNhbGVzX2Nsb3NlZF9hdDogc3RyaW5nXG4gIHNhbGVzX3N0YXJ0X2F0OiBzdHJpbmdcbiAgc2VsbGVyOiBzdHJpbmdcbiAgc3RhdHVzOiBcIndhaXRpbmdcIiB8IFwicGF1c2VcIlxuICB0b2tlbl9jb250cmFjdDogc3RyaW5nXG4gIHRvdGFsX3ByaWNlOiBzdHJpbmdcbn1cblxuZXhwb3J0IGludGVyZmFjZSBOZnRNYXJrZXRSZXF1ZXN0IHtcbiAgaWQ6IG51bWJlclxuICBtYXJrZXRfaWQ6IG51bWJlclxuICBidXllcjogc3RyaW5nXG4gIHNlbGxlcjogc3RyaW5nXG4gIG1hbmFnZXI6IHN0cmluZ1xuICByZXF1ZXN0ZWRfcGllY2VzOiBudW1iZXJcbiAgdG90YWxfcHJpY2U6IHN0cmluZ1xuICBiYXNlX3BpZWNlX3ByaWNlOiBzdHJpbmdcbiAgb25lX3BpZWNlX3ByaWNlOiBzdHJpbmdcbiAgdG90YWxfcGF5ZWQ6IHN0cmluZ1xuICBzdGF0dXM6IFwid2FpdGluZ1wiIHwgXCJhY2NlcHRlZFwiIHwgXCJjb25maXJtZWRcIiB8IFwiaXNzdWVkXCIgfCBcImRlY2xpbmVkXCIgfCBcImNhbmNlbGxlZFwiIHwgXCJjb21wbGV0ZWRcIlxuICBkYXlfc3RhcnQ6IG51bWJlclxuICBkYXlfZmluaXNoOiBudW1iZXJcbiAgZGVsaXZlcnlfdG86IERlbGl2ZXJ5UmVxdWVzdEZpbGxlZFtdIHwgRGVsaXZlcnlSZXF1ZXN0UGVyc29uYWxEYXRhXG4gIG1ldGE6IFJlY29yZDxzdHJpbmcsIHVua25vd24+XG59XG5cbmNsYXNzIE5mdENvbnRyYWN0IGV4dGVuZHMgQmFzZUNvbnRyYWN0IHtcbiAgY29uc3RydWN0b3IoYXBpOiBSZWFkQXBpLCB0YWJsZUNvZGVDb25maWc6IFRhYmxlQ29kZUNvbmZpZykge1xuICAgIHN1cGVyKGFwaSwgdGFibGVDb2RlQ29uZmlnLCAnbmZ0JylcbiAgfVxuXG4gIGFzeW5jIGdldE9iamVjdHNCeU93bmVyKG93bmVyOiBBY2NvdW50TmFtZSkge1xuICAgIGNvbnN0IHE6IFRhYmxlUm93c0FyZ3MgPSB7XG4gICAgICB0YWJsZTogJ3BpZWNlcycsXG4gICAgICBsb3dlcl9ib3VuZDogb3duZXIsXG4gICAgICB1cHBlcl9ib3VuZDogb3duZXIsXG4gICAgICBsaW1pdDogMTAwMCxcbiAgICAgIGluZGV4X3Bvc2l0aW9uOiAyLFxuICAgICAga2V5X3R5cGU6ICdpNjQnLFxuICAgICAgZ2V0QWxsUm93czogdHJ1ZSxcbiAgICB9XG4gICAgY29uc3Qge3Jvd3N9ID0gYXdhaXQgdGhpcy5nZXRUYWJsZVJvd3M8TmZ0UGllY2VPYmplY3Q+KHEpXG5cbiAgICByZXR1cm4gcm93cztcbiAgfVxuXG4gIGFzeW5jIGdldEFsbE9iamVjdHMoKSB7XG4gICAgY29uc3QgcTogVGFibGVSb3dzQXJncyA9IHtcbiAgICAgIHRhYmxlOiAnb2JqZWN0cycsXG4gICAgICBsaW1pdDogMTAwLFxuICAgICAgbG93ZXJfYm91bmQ6IDAsXG4gICAgICBnZXRBbGxSb3dzOiB0cnVlLFxuICAgICAgcGFyc2VNZXRhQXNKc29uOiB0cnVlLFxuICAgICAgcGFyc2VLZXlzQXNKc29uOiBbJ2ltYWdlcyddLFxuICAgICAgZGVmYXVsdEpzb25WYWx1ZXM6IHtcbiAgICAgICAgaW1hZ2VzOiAoKSA9PiBbXSxcbiAgICAgIH0sXG4gICAgfVxuICAgIGNvbnN0IHtyb3dzfSA9IGF3YWl0IHRoaXMuZ2V0VGFibGVSb3dzPE5mdE9iamVjdD4ocSlcblxuICAgIHJldHVybiByb3dzO1xuICB9XG5cbiAgYXN5bmMgZ2V0T2JqZWN0c0J5SWQoaWQ6IG51bWJlcikge1xuICAgIGNvbnN0IHE6IFRhYmxlUm93c0FyZ3MgPSB7XG4gICAgICB0YWJsZTogJ29iamVjdHMnLFxuICAgICAgbGltaXQ6IDEsXG4gICAgICBsb3dlcl9ib3VuZDogaWQsXG4gICAgICB1cHBlcl9ib3VuZDogaWQsXG4gICAgICBpbmRleF9wb3NpdGlvbjogMCxcbiAgICAgIGtleV90eXBlOiAnaTY0JyxcbiAgICAgIHBhcnNlTWV0YUFzSnNvbjogdHJ1ZSxcbiAgICAgIHBhcnNlS2V5c0FzSnNvbjogWydpbWFnZXMnXSxcbiAgICAgIGRlZmF1bHRKc29uVmFsdWVzOiB7XG4gICAgICAgIGltYWdlczogKCkgPT4gW10sXG4gICAgICB9LFxuICAgIH1cbiAgICBjb25zdCB7cm93c30gPSBhd2FpdCB0aGlzLmdldFRhYmxlUm93czxOZnRPYmplY3Q+KHEpXG5cbiAgICByZXR1cm4gcm93cztcbiAgfVxuXG4gIGFzeW5jIGdldE1hcmtldCgpIHtcbiAgICBjb25zdCBxOiBUYWJsZVJvd3NBcmdzID0ge1xuICAgICAgdGFibGU6ICdtYXJrZXQnLFxuICAgICAgbGltaXQ6IDEwMDAsXG4gICAgICBsb3dlcl9ib3VuZDogMCxcbiAgICAgIGdldEFsbFJvd3M6IHRydWUsXG4gICAgICBwYXJzZU1ldGFBc0pzb246IHRydWUsXG4gICAgfVxuICAgIGNvbnN0IHtyb3dzfSA9IGF3YWl0IHRoaXMuZ2V0VGFibGVSb3dzPE5mdE1hcmtldE9iamVjdD4ocSlcblxuICAgIHJldHVybiByb3dzO1xuICB9XG5cbiAgYXN5bmMgZ2V0TWFya2V0T2JqZWN0c0J5SWQoaWQ6IG51bWJlcikge1xuICAgIGNvbnN0IHE6IFRhYmxlUm93c0FyZ3MgPSB7XG4gICAgICB0YWJsZTogJ21hcmtldCcsXG4gICAgICBsaW1pdDogMSxcbiAgICAgIGxvd2VyX2JvdW5kOiBpZCxcbiAgICAgIHVwcGVyX2JvdW5kOiBpZCxcbiAgICAgIGluZGV4X3Bvc2l0aW9uOiAwLFxuICAgICAga2V5X3R5cGU6ICdpNjQnLFxuICAgICAgcGFyc2VNZXRhQXNKc29uOiB0cnVlLFxuICAgIH1cbiAgICBjb25zdCB7cm93c30gPSBhd2FpdCB0aGlzLmdldFRhYmxlUm93czxOZnRNYXJrZXRPYmplY3Q+KHEpXG5cbiAgICByZXR1cm4gcm93cztcbiAgfVxuXG4gIGFzeW5jIGZldGNoUmVxdWVzdHNXaXRoSW5kZXhQb3NpdGlvbih1c2VybmFtZTogQWNjb3VudE5hbWUsIGluZGV4UG9zaXRpb246IG51bWJlcikge1xuICAgIGNvbnN0IHE6IFRhYmxlUm93c0FyZ3MgPSB7XG4gICAgICB0YWJsZTogJ3JlcXVlc3RzJyxcbiAgICAgIGxvd2VyX2JvdW5kOiB1c2VybmFtZSxcbiAgICAgIHVwcGVyX2JvdW5kOiB1c2VybmFtZSxcbiAgICAgIGxpbWl0OiAxMDAwLFxuICAgICAgaW5kZXhfcG9zaXRpb246IGluZGV4UG9zaXRpb24sXG4gICAgICBrZXlfdHlwZTogJ2k2NCcsXG4gICAgICBwYXJzZUtleXNBc0pzb246IFsnZGVsaXZlcnlfdG8nLCAnbWV0YSddLFxuICAgICAgZ2V0QWxsUm93czogdHJ1ZSxcbiAgICB9XG4gICAgY29uc3Qge3Jvd3N9ID0gYXdhaXQgdGhpcy5nZXRUYWJsZVJvd3M8TmZ0TWFya2V0UmVxdWVzdD4ocSlcblxuICAgIHJldHVybiByb3dzO1xuICB9XG5cbiAgYXN5bmMgZmV0Y2hSZXF1ZXN0cyh1c2VybmFtZTogQWNjb3VudE5hbWUpIHtcbiAgICBjb25zdCBbYXNCdXllciwgYXNTZWxsZXJdID0gYXdhaXQgUHJvbWlzZS5hbGwoW1xuICAgICAgdGhpcy5mZXRjaFJlcXVlc3RzV2l0aEluZGV4UG9zaXRpb24odXNlcm5hbWUsIDIpLFxuICAgICAgdGhpcy5mZXRjaFJlcXVlc3RzV2l0aEluZGV4UG9zaXRpb24odXNlcm5hbWUsIDMpLFxuICAgIF0pO1xuXG4gICAgcmV0dXJuIFsuLi5hc0J1eWVyLCAuLi5hc1NlbGxlcl07XG4gIH1cbn1cblxuZXhwb3J0IGRlZmF1bHQgTmZ0Q29udHJhY3RcbiJdfQ==