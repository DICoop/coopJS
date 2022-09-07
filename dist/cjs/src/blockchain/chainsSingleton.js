"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var ono_1 = __importDefault(require("@jsdevtools/ono"));
var chain_1 = __importDefault(require("./chain"));
var errors_1 = require("./errors");
var registrator_1 = __importDefault(require("./registrator"));
var personalData_1 = __importDefault(require("./personalData"));
var ChainsSingleton = /** @class */ (function () {
    function ChainsSingleton() {
        this.chainsByName = {};
        this.initialized = false;
        this.rootChain = 'unknown';
        this.registrator = new registrator_1.default(null);
        this.personalData = new personalData_1.default(null);
    }
    ChainsSingleton.prototype.init = function (config, authKeySearchCallback, signatureProviderMaker, chainCrypt, textDecoder, textEncoder) {
        if (this.initialized) {
            return;
        }
        this.textDecoder = textDecoder;
        this.textEncoder = textEncoder;
        if (config.personalData) {
            this.personalData.setConfig(config.personalData);
        }
        for (var _i = 0, _a = config.chains; _i < _a.length; _i++) {
            var chain = _a[_i];
            this.chainsByName[chain.name] = new chain_1.default(chain, config.tableCodeConfig, this.personalData, authKeySearchCallback, signatureProviderMaker, chainCrypt, this.textDecoder, this.textEncoder);
        }
        this.rootChain = config.ual.rootChain;
        if (config.registrator) {
            this.registrator.setConfig(config.registrator);
        }
        this.initialized = true;
    };
    ChainsSingleton.prototype.checkChainsIsInitialized = function () {
        if (!this.initialized) {
            throw (0, ono_1.default)(new errors_1.ChainsIsNotInitializedError('Chains is not initialized'));
        }
    };
    ChainsSingleton.prototype.getChainByName = function (name) {
        this.checkChainsIsInitialized();
        var chain = this.chainsByName[name];
        if (!chain) {
            throw (0, ono_1.default)(new errors_1.UnknownChainError("Chain \"".concat(name, "\" not found")));
        }
        return chain;
    };
    ChainsSingleton.prototype.getRootChain = function () {
        return this.getChainByName(this.rootChain);
    };
    return ChainsSingleton;
}());
exports.default = ChainsSingleton;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY2hhaW5zU2luZ2xldG9uLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vdHMvc3JjL2Jsb2NrY2hhaW4vY2hhaW5zU2luZ2xldG9uLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7O0FBQUEsd0RBQWlDO0FBR2pDLGtEQUEyQjtBQUUzQixtQ0FBeUU7QUFDekUsOERBQXdDO0FBQ3hDLGdFQUEwQztBQU0xQztJQVNFO1FBQ0UsSUFBSSxDQUFDLFlBQVksR0FBRyxFQUFFLENBQUE7UUFDdEIsSUFBSSxDQUFDLFdBQVcsR0FBRyxLQUFLLENBQUE7UUFDeEIsSUFBSSxDQUFDLFNBQVMsR0FBRyxTQUFTLENBQUE7UUFDMUIsSUFBSSxDQUFDLFdBQVcsR0FBRyxJQUFJLHFCQUFXLENBQUMsSUFBSSxDQUFDLENBQUE7UUFDeEMsSUFBSSxDQUFDLFlBQVksR0FBRyxJQUFJLHNCQUFZLENBQUMsSUFBSSxDQUFDLENBQUE7SUFDNUMsQ0FBQztJQUVELDhCQUFJLEdBQUosVUFDSSxNQUFjLEVBQ2QscUJBQTZDLEVBQzdDLHNCQUErQyxFQUMvQyxVQUF1QixFQUN2QixXQUFnQyxFQUNoQyxXQUFnQztRQUVsQyxJQUFJLElBQUksQ0FBQyxXQUFXLEVBQUU7WUFDcEIsT0FBTTtTQUNQO1FBRUQsSUFBSSxDQUFDLFdBQVcsR0FBRyxXQUFXLENBQUE7UUFDOUIsSUFBSSxDQUFDLFdBQVcsR0FBRyxXQUFXLENBQUE7UUFFOUIsSUFBSSxNQUFNLENBQUMsWUFBWSxFQUFFO1lBQ3ZCLElBQUksQ0FBQyxZQUFZLENBQUMsU0FBUyxDQUFDLE1BQU0sQ0FBQyxZQUFZLENBQUMsQ0FBQTtTQUNqRDtRQUVELEtBQW9CLFVBQWEsRUFBYixLQUFBLE1BQU0sQ0FBQyxNQUFNLEVBQWIsY0FBYSxFQUFiLElBQWEsRUFBRTtZQUE5QixJQUFNLEtBQUssU0FBQTtZQUNkLElBQUksQ0FBQyxZQUFZLENBQUMsS0FBSyxDQUFDLElBQUksQ0FBQyxHQUFHLElBQUksZUFBSyxDQUNyQyxLQUFLLEVBQ0wsTUFBTSxDQUFDLGVBQWUsRUFDdEIsSUFBSSxDQUFDLFlBQVksRUFDakIscUJBQXFCLEVBQ3JCLHNCQUFzQixFQUN0QixVQUFVLEVBQ1YsSUFBSSxDQUFDLFdBQVcsRUFDaEIsSUFBSSxDQUFDLFdBQVcsQ0FDbkIsQ0FBQTtTQUNGO1FBRUQsSUFBSSxDQUFDLFNBQVMsR0FBRyxNQUFNLENBQUMsR0FBRyxDQUFDLFNBQVMsQ0FBQTtRQUNyQyxJQUFJLE1BQU0sQ0FBQyxXQUFXLEVBQUU7WUFDdEIsSUFBSSxDQUFDLFdBQVcsQ0FBQyxTQUFTLENBQUMsTUFBTSxDQUFDLFdBQVcsQ0FBQyxDQUFBO1NBQy9DO1FBQ0QsSUFBSSxDQUFDLFdBQVcsR0FBRyxJQUFJLENBQUE7SUFDekIsQ0FBQztJQUVELGtEQUF3QixHQUF4QjtRQUNFLElBQUksQ0FBQyxJQUFJLENBQUMsV0FBVyxFQUFFO1lBQ3JCLE1BQU0sSUFBQSxhQUFHLEVBQUMsSUFBSSxvQ0FBMkIsQ0FBQywyQkFBMkIsQ0FBQyxDQUFDLENBQUE7U0FDeEU7SUFDSCxDQUFDO0lBRUQsd0NBQWMsR0FBZCxVQUFlLElBQVk7UUFDekIsSUFBSSxDQUFDLHdCQUF3QixFQUFFLENBQUE7UUFFL0IsSUFBTSxLQUFLLEdBQUcsSUFBSSxDQUFDLFlBQVksQ0FBQyxJQUFJLENBQUMsQ0FBQTtRQUVyQyxJQUFJLENBQUMsS0FBSyxFQUFFO1lBQ1YsTUFBTSxJQUFBLGFBQUcsRUFBQyxJQUFJLDBCQUFpQixDQUFDLGtCQUFVLElBQUksaUJBQWEsQ0FBQyxDQUFDLENBQUE7U0FDOUQ7UUFFRCxPQUFPLEtBQUssQ0FBQTtJQUNkLENBQUM7SUFFRCxzQ0FBWSxHQUFaO1FBQ0UsT0FBTyxJQUFJLENBQUMsY0FBYyxDQUFDLElBQUksQ0FBQyxTQUFTLENBQUMsQ0FBQTtJQUM1QyxDQUFDO0lBQ0gsc0JBQUM7QUFBRCxDQUFDLEFBN0VELElBNkVDO0FBRUQsa0JBQWUsZUFBZSxDQUFBIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IG9ubyBmcm9tICdAanNkZXZ0b29scy9vbm8nXG5pbXBvcnQge1RleHREZWNvZGVyLCBUZXh0RW5jb2Rlcn0gZnJvbSAndGV4dC1lbmNvZGluZydcblxuaW1wb3J0IENoYWluIGZyb20gJy4vY2hhaW4nXG5pbXBvcnQge0NvbmZpZywgU2lnbmF0dXJlUHJvdmlkZXJNYWtlciwgQXV0aEtleVNlYXJjaENhbGxiYWNrLCBDaGFpbkNyeXB0fSBmcm9tICcuL3R5cGVzJ1xuaW1wb3J0IHsgVW5rbm93bkNoYWluRXJyb3IsIENoYWluc0lzTm90SW5pdGlhbGl6ZWRFcnJvciB9IGZyb20gJy4vZXJyb3JzJ1xuaW1wb3J0IFJlZ2lzdHJhdG9yIGZyb20gXCIuL3JlZ2lzdHJhdG9yXCI7XG5pbXBvcnQgUGVyc29uYWxEYXRhIGZyb20gXCIuL3BlcnNvbmFsRGF0YVwiO1xuXG5pbnRlcmZhY2UgQ2hhaW5zQnlOYW1lIHtcbiAgW2tleTogc3RyaW5nXTogQ2hhaW5cbn1cblxuY2xhc3MgQ2hhaW5zU2luZ2xldG9uIHtcbiAgcHJpdmF0ZSByZWFkb25seSBjaGFpbnNCeU5hbWU6IENoYWluc0J5TmFtZVxuICBwcml2YXRlIGluaXRpYWxpemVkOiBib29sZWFuXG4gIHByaXZhdGUgcm9vdENoYWluOiBzdHJpbmdcbiAgcHVibGljIHJlZ2lzdHJhdG9yOiBSZWdpc3RyYXRvclxuICBwdWJsaWMgcGVyc29uYWxEYXRhOiBQZXJzb25hbERhdGFcbiAgcHVibGljIHRleHREZWNvZGVyPzogdHlwZW9mIFRleHREZWNvZGVyXG4gIHB1YmxpYyB0ZXh0RW5jb2Rlcj86IHR5cGVvZiBUZXh0RW5jb2RlclxuXG4gIGNvbnN0cnVjdG9yKCkge1xuICAgIHRoaXMuY2hhaW5zQnlOYW1lID0ge31cbiAgICB0aGlzLmluaXRpYWxpemVkID0gZmFsc2VcbiAgICB0aGlzLnJvb3RDaGFpbiA9ICd1bmtub3duJ1xuICAgIHRoaXMucmVnaXN0cmF0b3IgPSBuZXcgUmVnaXN0cmF0b3IobnVsbClcbiAgICB0aGlzLnBlcnNvbmFsRGF0YSA9IG5ldyBQZXJzb25hbERhdGEobnVsbClcbiAgfVxuXG4gIGluaXQoXG4gICAgICBjb25maWc6IENvbmZpZyxcbiAgICAgIGF1dGhLZXlTZWFyY2hDYWxsYmFjaz86IEF1dGhLZXlTZWFyY2hDYWxsYmFjayxcbiAgICAgIHNpZ25hdHVyZVByb3ZpZGVyTWFrZXI/OiBTaWduYXR1cmVQcm92aWRlck1ha2VyLFxuICAgICAgY2hhaW5DcnlwdD86IENoYWluQ3J5cHQsXG4gICAgICB0ZXh0RGVjb2Rlcj86IHR5cGVvZiBUZXh0RGVjb2RlcixcbiAgICAgIHRleHRFbmNvZGVyPzogdHlwZW9mIFRleHRFbmNvZGVyLFxuICAgICkge1xuICAgIGlmICh0aGlzLmluaXRpYWxpemVkKSB7XG4gICAgICByZXR1cm5cbiAgICB9XG5cbiAgICB0aGlzLnRleHREZWNvZGVyID0gdGV4dERlY29kZXJcbiAgICB0aGlzLnRleHRFbmNvZGVyID0gdGV4dEVuY29kZXJcblxuICAgIGlmIChjb25maWcucGVyc29uYWxEYXRhKSB7XG4gICAgICB0aGlzLnBlcnNvbmFsRGF0YS5zZXRDb25maWcoY29uZmlnLnBlcnNvbmFsRGF0YSlcbiAgICB9XG5cbiAgICBmb3IgKGNvbnN0IGNoYWluIG9mIGNvbmZpZy5jaGFpbnMpIHtcbiAgICAgIHRoaXMuY2hhaW5zQnlOYW1lW2NoYWluLm5hbWVdID0gbmV3IENoYWluKFxuICAgICAgICAgIGNoYWluLFxuICAgICAgICAgIGNvbmZpZy50YWJsZUNvZGVDb25maWcsXG4gICAgICAgICAgdGhpcy5wZXJzb25hbERhdGEsXG4gICAgICAgICAgYXV0aEtleVNlYXJjaENhbGxiYWNrLFxuICAgICAgICAgIHNpZ25hdHVyZVByb3ZpZGVyTWFrZXIsXG4gICAgICAgICAgY2hhaW5DcnlwdCxcbiAgICAgICAgICB0aGlzLnRleHREZWNvZGVyLFxuICAgICAgICAgIHRoaXMudGV4dEVuY29kZXJcbiAgICAgIClcbiAgICB9XG5cbiAgICB0aGlzLnJvb3RDaGFpbiA9IGNvbmZpZy51YWwucm9vdENoYWluXG4gICAgaWYgKGNvbmZpZy5yZWdpc3RyYXRvcikge1xuICAgICAgdGhpcy5yZWdpc3RyYXRvci5zZXRDb25maWcoY29uZmlnLnJlZ2lzdHJhdG9yKVxuICAgIH1cbiAgICB0aGlzLmluaXRpYWxpemVkID0gdHJ1ZVxuICB9XG5cbiAgY2hlY2tDaGFpbnNJc0luaXRpYWxpemVkKCkge1xuICAgIGlmICghdGhpcy5pbml0aWFsaXplZCkge1xuICAgICAgdGhyb3cgb25vKG5ldyBDaGFpbnNJc05vdEluaXRpYWxpemVkRXJyb3IoJ0NoYWlucyBpcyBub3QgaW5pdGlhbGl6ZWQnKSlcbiAgICB9XG4gIH1cblxuICBnZXRDaGFpbkJ5TmFtZShuYW1lOiBzdHJpbmcpIHtcbiAgICB0aGlzLmNoZWNrQ2hhaW5zSXNJbml0aWFsaXplZCgpXG5cbiAgICBjb25zdCBjaGFpbiA9IHRoaXMuY2hhaW5zQnlOYW1lW25hbWVdXG5cbiAgICBpZiAoIWNoYWluKSB7XG4gICAgICB0aHJvdyBvbm8obmV3IFVua25vd25DaGFpbkVycm9yKGBDaGFpbiBcIiR7bmFtZX1cIiBub3QgZm91bmRgKSlcbiAgICB9XG5cbiAgICByZXR1cm4gY2hhaW5cbiAgfVxuXG4gIGdldFJvb3RDaGFpbigpIHtcbiAgICByZXR1cm4gdGhpcy5nZXRDaGFpbkJ5TmFtZSh0aGlzLnJvb3RDaGFpbilcbiAgfVxufVxuXG5leHBvcnQgZGVmYXVsdCBDaGFpbnNTaW5nbGV0b25cbiJdfQ==