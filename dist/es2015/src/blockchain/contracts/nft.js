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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibmZ0LmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vdHMvc3JjL2Jsb2NrY2hhaW4vY29udHJhY3RzL25mdC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7QUFHQSxPQUFPLFlBQTZCLE1BQU0sUUFBUSxDQUFBO0FBb0VsRCxNQUFNLFdBQVksU0FBUSxZQUFZO0lBQ3BDLFlBQVksR0FBWSxFQUFFLGVBQWdDO1FBQ3hELEtBQUssQ0FBQyxHQUFHLEVBQUUsZUFBZSxFQUFFLEtBQUssQ0FBQyxDQUFBO0lBQ3BDLENBQUM7SUFFSyxpQkFBaUIsQ0FBQyxLQUFrQjs7WUFDeEMsTUFBTSxDQUFDLEdBQWtCO2dCQUN2QixLQUFLLEVBQUUsUUFBUTtnQkFDZixXQUFXLEVBQUUsS0FBSztnQkFDbEIsV0FBVyxFQUFFLEtBQUs7Z0JBQ2xCLEtBQUssRUFBRSxJQUFJO2dCQUNYLGNBQWMsRUFBRSxDQUFDO2dCQUNqQixRQUFRLEVBQUUsS0FBSztnQkFDZixVQUFVLEVBQUUsSUFBSTthQUNqQixDQUFBO1lBQ0QsTUFBTSxFQUFDLElBQUksRUFBQyxHQUFHLE1BQU0sSUFBSSxDQUFDLFlBQVksQ0FBaUIsQ0FBQyxDQUFDLENBQUE7WUFFekQsT0FBTyxJQUFJLENBQUM7UUFDZCxDQUFDO0tBQUE7SUFFSyxhQUFhOztZQUNqQixNQUFNLENBQUMsR0FBa0I7Z0JBQ3ZCLEtBQUssRUFBRSxTQUFTO2dCQUNoQixLQUFLLEVBQUUsR0FBRztnQkFDVixXQUFXLEVBQUUsQ0FBQztnQkFDZCxVQUFVLEVBQUUsSUFBSTtnQkFDaEIsZUFBZSxFQUFFLElBQUk7Z0JBQ3JCLGVBQWUsRUFBRSxDQUFDLFFBQVEsQ0FBQztnQkFDM0IsaUJBQWlCLEVBQUU7b0JBQ2pCLE1BQU0sRUFBRSxHQUFHLEVBQUUsQ0FBQyxFQUFFO2lCQUNqQjthQUNGLENBQUE7WUFDRCxNQUFNLEVBQUMsSUFBSSxFQUFDLEdBQUcsTUFBTSxJQUFJLENBQUMsWUFBWSxDQUFZLENBQUMsQ0FBQyxDQUFBO1lBRXBELE9BQU8sSUFBSSxDQUFDO1FBQ2QsQ0FBQztLQUFBO0lBRUssY0FBYyxDQUFDLEVBQVU7O1lBQzdCLE1BQU0sQ0FBQyxHQUFrQjtnQkFDdkIsS0FBSyxFQUFFLFNBQVM7Z0JBQ2hCLEtBQUssRUFBRSxDQUFDO2dCQUNSLFdBQVcsRUFBRSxFQUFFO2dCQUNmLFdBQVcsRUFBRSxFQUFFO2dCQUNmLGNBQWMsRUFBRSxDQUFDO2dCQUNqQixRQUFRLEVBQUUsS0FBSztnQkFDZixlQUFlLEVBQUUsSUFBSTtnQkFDckIsZUFBZSxFQUFFLENBQUMsUUFBUSxDQUFDO2dCQUMzQixpQkFBaUIsRUFBRTtvQkFDakIsTUFBTSxFQUFFLEdBQUcsRUFBRSxDQUFDLEVBQUU7aUJBQ2pCO2FBQ0YsQ0FBQTtZQUNELE1BQU0sRUFBQyxJQUFJLEVBQUMsR0FBRyxNQUFNLElBQUksQ0FBQyxZQUFZLENBQVksQ0FBQyxDQUFDLENBQUE7WUFFcEQsT0FBTyxJQUFJLENBQUM7UUFDZCxDQUFDO0tBQUE7SUFFSyxTQUFTOztZQUNiLE1BQU0sQ0FBQyxHQUFrQjtnQkFDdkIsS0FBSyxFQUFFLFFBQVE7Z0JBQ2YsS0FBSyxFQUFFLElBQUk7Z0JBQ1gsV0FBVyxFQUFFLENBQUM7Z0JBQ2QsVUFBVSxFQUFFLElBQUk7Z0JBQ2hCLGVBQWUsRUFBRSxJQUFJO2FBQ3RCLENBQUE7WUFDRCxNQUFNLEVBQUMsSUFBSSxFQUFDLEdBQUcsTUFBTSxJQUFJLENBQUMsWUFBWSxDQUFrQixDQUFDLENBQUMsQ0FBQTtZQUUxRCxPQUFPLElBQUksQ0FBQztRQUNkLENBQUM7S0FBQTtJQUVLLG9CQUFvQixDQUFDLEVBQVU7O1lBQ25DLE1BQU0sQ0FBQyxHQUFrQjtnQkFDdkIsS0FBSyxFQUFFLFFBQVE7Z0JBQ2YsS0FBSyxFQUFFLENBQUM7Z0JBQ1IsV0FBVyxFQUFFLEVBQUU7Z0JBQ2YsV0FBVyxFQUFFLEVBQUU7Z0JBQ2YsY0FBYyxFQUFFLENBQUM7Z0JBQ2pCLFFBQVEsRUFBRSxLQUFLO2dCQUNmLGVBQWUsRUFBRSxJQUFJO2FBQ3RCLENBQUE7WUFDRCxNQUFNLEVBQUMsSUFBSSxFQUFDLEdBQUcsTUFBTSxJQUFJLENBQUMsWUFBWSxDQUFrQixDQUFDLENBQUMsQ0FBQTtZQUUxRCxPQUFPLElBQUksQ0FBQztRQUNkLENBQUM7S0FBQTtJQUVLLDhCQUE4QixDQUFDLFFBQXFCLEVBQUUsYUFBcUI7O1lBQy9FLE1BQU0sQ0FBQyxHQUFrQjtnQkFDdkIsS0FBSyxFQUFFLFVBQVU7Z0JBQ2pCLFdBQVcsRUFBRSxRQUFRO2dCQUNyQixXQUFXLEVBQUUsUUFBUTtnQkFDckIsS0FBSyxFQUFFLElBQUk7Z0JBQ1gsY0FBYyxFQUFFLGFBQWE7Z0JBQzdCLFFBQVEsRUFBRSxLQUFLO2dCQUNmLGVBQWUsRUFBRSxDQUFDLGFBQWEsRUFBRSxNQUFNLENBQUM7Z0JBQ3hDLFVBQVUsRUFBRSxJQUFJO2FBQ2pCLENBQUE7WUFDRCxNQUFNLEVBQUMsSUFBSSxFQUFDLEdBQUcsTUFBTSxJQUFJLENBQUMsWUFBWSxDQUFtQixDQUFDLENBQUMsQ0FBQTtZQUUzRCxPQUFPLElBQUksQ0FBQztRQUNkLENBQUM7S0FBQTtJQUVLLGFBQWEsQ0FBQyxRQUFxQjs7WUFDdkMsTUFBTSxDQUFDLE9BQU8sRUFBRSxRQUFRLENBQUMsR0FBRyxNQUFNLE9BQU8sQ0FBQyxHQUFHLENBQUM7Z0JBQzVDLElBQUksQ0FBQyw4QkFBOEIsQ0FBQyxRQUFRLEVBQUUsQ0FBQyxDQUFDO2dCQUNoRCxJQUFJLENBQUMsOEJBQThCLENBQUMsUUFBUSxFQUFFLENBQUMsQ0FBQzthQUNqRCxDQUFDLENBQUM7WUFFSCxPQUFPLENBQUMsR0FBRyxPQUFPLEVBQUUsR0FBRyxRQUFRLENBQUMsQ0FBQztRQUNuQyxDQUFDO0tBQUE7Q0FDRjtBQUVELGVBQWUsV0FBVyxDQUFBIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgQWNjb3VudE5hbWUgfSBmcm9tICcuLi8uLi9lb3MvdHlwZXMnXG5pbXBvcnQgUmVhZEFwaSBmcm9tICcuLi9yZWFkQXBpJ1xuaW1wb3J0IHsgVGFibGVDb2RlQ29uZmlnIH0gZnJvbSAnLi4vdHlwZXMnXG5pbXBvcnQgQmFzZUNvbnRyYWN0LCB7VGFibGVSb3dzQXJnc30gZnJvbSAnLi9iYXNlJ1xuXG5leHBvcnQgaW50ZXJmYWNlIE5mdE9iamVjdCB7XG4gIGNhdGVnb3J5OiBzdHJpbmdcbiAgY3JlYXRvcjogc3RyaW5nXG4gIGRlc2NyaXB0aW9uOiBzdHJpbmdcbiAgaWQ6IG51bWJlclxuICBpbWFnZXM6IHN0cmluZ1tdXG4gIGlwbnM6IHN0cmluZ1xuICBtZXRhOiBSZWNvcmQ8c3RyaW5nLCB1bmtub3duPixcbiAgdGl0bGU6IHN0cmluZ1xuICB0b3RhbF9waWVjZXM6IG51bWJlclxufVxuXG5leHBvcnQgaW50ZXJmYWNlIE5mdFBpZWNlT2JqZWN0IHtcbiAgaWQ6IG51bWJlclxuICBvYmplY3RfaWQ6IG51bWJlclxuICBvd25lcjogc3RyaW5nLFxuICBwaWVjZXM6IG51bWJlclxuICBkYXlfZmluaXNoOiBudW1iZXJcbiAgZGF5X3N0YXJ0OiBudW1iZXJcbn1cblxuZXhwb3J0IGludGVyZmFjZSBEZWxpdmVyeVJlcXVlc3Qge1xuICB0eXBlOiBzdHJpbmdcbiAgcGxhY2Vob2xkZXI6IHN0cmluZ1xufVxuXG5leHBvcnQgdHlwZSBEZWxpdmVyeVJlcXVlc3RGaWxsZWQgPSBEZWxpdmVyeVJlcXVlc3QgJiB7XG4gIHZhbHVlOiBzdHJpbmdcbn1cblxuZXhwb3J0IGludGVyZmFjZSBOZnRNYXJrZXRPYmplY3Qge1xuICBiYXNlX3BpZWNlX3ByaWNlOiBzdHJpbmdcbiAgYmxvY2tlZF9waWVjZXM6IG51bWJlclxuICBkYXlfZmluaXNoOiBudW1iZXJcbiAgZGF5X3N0YXJ0OiBudW1iZXJcbiAgaWQ6IG51bWJlclxuICBtZXRhOiB7ZGVsaXZlcnlfcmVxdWVzdDogRGVsaXZlcnlSZXF1ZXN0W119XG4gIG1pbl9waWVjZV9wcmljZTogc3RyaW5nXG4gIG9iamVjdF9pZDogbnVtYmVyXG4gIHJlbWFpbl9waWVjZXM6IG51bWJlclxuICBzYWxlc19jbG9zZWRfYXQ6IHN0cmluZ1xuICBzYWxlc19zdGFydF9hdDogc3RyaW5nXG4gIHNlbGxlcjogc3RyaW5nXG4gIHN0YXR1czogXCJ3YWl0aW5nXCIgfCBcInBhdXNlXCJcbiAgdG9rZW5fY29udHJhY3Q6IHN0cmluZ1xuICB0b3RhbF9wcmljZTogc3RyaW5nXG59XG5cbmV4cG9ydCBpbnRlcmZhY2UgTmZ0TWFya2V0UmVxdWVzdCB7XG4gIGlkOiBudW1iZXJcbiAgbWFya2V0X2lkOiBudW1iZXJcbiAgYnV5ZXI6IHN0cmluZ1xuICBzZWxsZXI6IHN0cmluZ1xuICBtYW5hZ2VyOiBzdHJpbmdcbiAgcmVxdWVzdGVkX3BpZWNlczogbnVtYmVyXG4gIHRvdGFsX3ByaWNlOiBzdHJpbmdcbiAgYmFzZV9waWVjZV9wcmljZTogc3RyaW5nXG4gIG9uZV9waWVjZV9wcmljZTogc3RyaW5nXG4gIHRvdGFsX3BheWVkOiBzdHJpbmdcbiAgc3RhdHVzOiBcIndhaXRpbmdcIiB8IFwiYWNjZXB0ZWRcIiB8IFwiY29uZmlybWVkXCIgfCBcImlzc3VlZFwiIHwgXCJkZWNsaW5lZFwiIHwgXCJjYW5jZWxsZWRcIiB8IFwiY29tcGxldGVkXCJcbiAgZGF5X3N0YXJ0OiBudW1iZXJcbiAgZGF5X2ZpbmlzaDogbnVtYmVyXG4gIGRlbGl2ZXJ5X3RvOiBEZWxpdmVyeVJlcXVlc3RGaWxsZWRbXVxuICBtZXRhOiBSZWNvcmQ8c3RyaW5nLCB1bmtub3duPlxufVxuXG5jbGFzcyBOZnRDb250cmFjdCBleHRlbmRzIEJhc2VDb250cmFjdCB7XG4gIGNvbnN0cnVjdG9yKGFwaTogUmVhZEFwaSwgdGFibGVDb2RlQ29uZmlnOiBUYWJsZUNvZGVDb25maWcpIHtcbiAgICBzdXBlcihhcGksIHRhYmxlQ29kZUNvbmZpZywgJ25mdCcpXG4gIH1cblxuICBhc3luYyBnZXRPYmplY3RzQnlPd25lcihvd25lcjogQWNjb3VudE5hbWUpIHtcbiAgICBjb25zdCBxOiBUYWJsZVJvd3NBcmdzID0ge1xuICAgICAgdGFibGU6ICdwaWVjZXMnLFxuICAgICAgbG93ZXJfYm91bmQ6IG93bmVyLFxuICAgICAgdXBwZXJfYm91bmQ6IG93bmVyLFxuICAgICAgbGltaXQ6IDEwMDAsXG4gICAgICBpbmRleF9wb3NpdGlvbjogMixcbiAgICAgIGtleV90eXBlOiAnaTY0JyxcbiAgICAgIGdldEFsbFJvd3M6IHRydWUsXG4gICAgfVxuICAgIGNvbnN0IHtyb3dzfSA9IGF3YWl0IHRoaXMuZ2V0VGFibGVSb3dzPE5mdFBpZWNlT2JqZWN0PihxKVxuXG4gICAgcmV0dXJuIHJvd3M7XG4gIH1cblxuICBhc3luYyBnZXRBbGxPYmplY3RzKCkge1xuICAgIGNvbnN0IHE6IFRhYmxlUm93c0FyZ3MgPSB7XG4gICAgICB0YWJsZTogJ29iamVjdHMnLFxuICAgICAgbGltaXQ6IDEwMCxcbiAgICAgIGxvd2VyX2JvdW5kOiAwLFxuICAgICAgZ2V0QWxsUm93czogdHJ1ZSxcbiAgICAgIHBhcnNlTWV0YUFzSnNvbjogdHJ1ZSxcbiAgICAgIHBhcnNlS2V5c0FzSnNvbjogWydpbWFnZXMnXSxcbiAgICAgIGRlZmF1bHRKc29uVmFsdWVzOiB7XG4gICAgICAgIGltYWdlczogKCkgPT4gW10sXG4gICAgICB9LFxuICAgIH1cbiAgICBjb25zdCB7cm93c30gPSBhd2FpdCB0aGlzLmdldFRhYmxlUm93czxOZnRPYmplY3Q+KHEpXG5cbiAgICByZXR1cm4gcm93cztcbiAgfVxuXG4gIGFzeW5jIGdldE9iamVjdHNCeUlkKGlkOiBudW1iZXIpIHtcbiAgICBjb25zdCBxOiBUYWJsZVJvd3NBcmdzID0ge1xuICAgICAgdGFibGU6ICdvYmplY3RzJyxcbiAgICAgIGxpbWl0OiAxLFxuICAgICAgbG93ZXJfYm91bmQ6IGlkLFxuICAgICAgdXBwZXJfYm91bmQ6IGlkLFxuICAgICAgaW5kZXhfcG9zaXRpb246IDAsXG4gICAgICBrZXlfdHlwZTogJ2k2NCcsXG4gICAgICBwYXJzZU1ldGFBc0pzb246IHRydWUsXG4gICAgICBwYXJzZUtleXNBc0pzb246IFsnaW1hZ2VzJ10sXG4gICAgICBkZWZhdWx0SnNvblZhbHVlczoge1xuICAgICAgICBpbWFnZXM6ICgpID0+IFtdLFxuICAgICAgfSxcbiAgICB9XG4gICAgY29uc3Qge3Jvd3N9ID0gYXdhaXQgdGhpcy5nZXRUYWJsZVJvd3M8TmZ0T2JqZWN0PihxKVxuXG4gICAgcmV0dXJuIHJvd3M7XG4gIH1cblxuICBhc3luYyBnZXRNYXJrZXQoKSB7XG4gICAgY29uc3QgcTogVGFibGVSb3dzQXJncyA9IHtcbiAgICAgIHRhYmxlOiAnbWFya2V0JyxcbiAgICAgIGxpbWl0OiAxMDAwLFxuICAgICAgbG93ZXJfYm91bmQ6IDAsXG4gICAgICBnZXRBbGxSb3dzOiB0cnVlLFxuICAgICAgcGFyc2VNZXRhQXNKc29uOiB0cnVlLFxuICAgIH1cbiAgICBjb25zdCB7cm93c30gPSBhd2FpdCB0aGlzLmdldFRhYmxlUm93czxOZnRNYXJrZXRPYmplY3Q+KHEpXG5cbiAgICByZXR1cm4gcm93cztcbiAgfVxuXG4gIGFzeW5jIGdldE1hcmtldE9iamVjdHNCeUlkKGlkOiBudW1iZXIpIHtcbiAgICBjb25zdCBxOiBUYWJsZVJvd3NBcmdzID0ge1xuICAgICAgdGFibGU6ICdtYXJrZXQnLFxuICAgICAgbGltaXQ6IDEsXG4gICAgICBsb3dlcl9ib3VuZDogaWQsXG4gICAgICB1cHBlcl9ib3VuZDogaWQsXG4gICAgICBpbmRleF9wb3NpdGlvbjogMCxcbiAgICAgIGtleV90eXBlOiAnaTY0JyxcbiAgICAgIHBhcnNlTWV0YUFzSnNvbjogdHJ1ZSxcbiAgICB9XG4gICAgY29uc3Qge3Jvd3N9ID0gYXdhaXQgdGhpcy5nZXRUYWJsZVJvd3M8TmZ0TWFya2V0T2JqZWN0PihxKVxuXG4gICAgcmV0dXJuIHJvd3M7XG4gIH1cblxuICBhc3luYyBmZXRjaFJlcXVlc3RzV2l0aEluZGV4UG9zaXRpb24odXNlcm5hbWU6IEFjY291bnROYW1lLCBpbmRleFBvc2l0aW9uOiBudW1iZXIpIHtcbiAgICBjb25zdCBxOiBUYWJsZVJvd3NBcmdzID0ge1xuICAgICAgdGFibGU6ICdyZXF1ZXN0cycsXG4gICAgICBsb3dlcl9ib3VuZDogdXNlcm5hbWUsXG4gICAgICB1cHBlcl9ib3VuZDogdXNlcm5hbWUsXG4gICAgICBsaW1pdDogMTAwMCxcbiAgICAgIGluZGV4X3Bvc2l0aW9uOiBpbmRleFBvc2l0aW9uLFxuICAgICAga2V5X3R5cGU6ICdpNjQnLFxuICAgICAgcGFyc2VLZXlzQXNKc29uOiBbJ2RlbGl2ZXJ5X3RvJywgJ21ldGEnXSxcbiAgICAgIGdldEFsbFJvd3M6IHRydWUsXG4gICAgfVxuICAgIGNvbnN0IHtyb3dzfSA9IGF3YWl0IHRoaXMuZ2V0VGFibGVSb3dzPE5mdE1hcmtldFJlcXVlc3Q+KHEpXG5cbiAgICByZXR1cm4gcm93cztcbiAgfVxuXG4gIGFzeW5jIGZldGNoUmVxdWVzdHModXNlcm5hbWU6IEFjY291bnROYW1lKSB7XG4gICAgY29uc3QgW2FzQnV5ZXIsIGFzU2VsbGVyXSA9IGF3YWl0IFByb21pc2UuYWxsKFtcbiAgICAgIHRoaXMuZmV0Y2hSZXF1ZXN0c1dpdGhJbmRleFBvc2l0aW9uKHVzZXJuYW1lLCAyKSxcbiAgICAgIHRoaXMuZmV0Y2hSZXF1ZXN0c1dpdGhJbmRleFBvc2l0aW9uKHVzZXJuYW1lLCAzKSxcbiAgICBdKTtcblxuICAgIHJldHVybiBbLi4uYXNCdXllciwgLi4uYXNTZWxsZXJdO1xuICB9XG59XG5cbmV4cG9ydCBkZWZhdWx0IE5mdENvbnRyYWN0XG4iXX0=