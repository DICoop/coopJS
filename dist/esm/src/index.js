/// <reference path="./eos-api.d.ts" />
export { makePublicKeyByMnemonic, generateAccount, makeAccountByMnemonic, makeAccountByWif, } from './auth';
export { isValidWif } from './auth/keys/ecc';
export { default as ChainsSingleton } from './blockchain/chainsSingleton';
export { default as ReadApi } from './blockchain/readApi';
export { default as BaseContract } from './blockchain/contracts/base';
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5kZXguanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi90cy9zcmMvaW5kZXgudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsdUNBQXVDO0FBRXZDLE9BQU8sRUFDSCx1QkFBdUIsRUFDdkIsZUFBZSxFQUVmLHFCQUFxQixFQUNyQixnQkFBZ0IsR0FDbkIsTUFBTSxRQUFRLENBQUE7QUFFZixPQUFPLEVBQUMsVUFBVSxFQUFDLE1BQU0saUJBQWlCLENBQUE7QUFFMUMsT0FBTyxFQUFDLE9BQU8sSUFBSSxlQUFlLEVBQUMsTUFBTSw4QkFBOEIsQ0FBQTtBQUV2RSxPQUFPLEVBQUMsT0FBTyxJQUFJLE9BQU8sRUFBQyxNQUFNLHNCQUFzQixDQUFBO0FBRXZELE9BQU8sRUFBQyxPQUFPLElBQUksWUFBWSxFQUFDLE1BQU0sNkJBQTZCLENBQUEiLCJzb3VyY2VzQ29udGVudCI6WyIvLy8gPHJlZmVyZW5jZSBwYXRoPVwiLi9lb3MtYXBpLmQudHNcIiAvPlxuXG5leHBvcnQge1xuICAgIG1ha2VQdWJsaWNLZXlCeU1uZW1vbmljLFxuICAgIGdlbmVyYXRlQWNjb3VudCxcbiAgICBBY2NvdW50RGF0YSxcbiAgICBtYWtlQWNjb3VudEJ5TW5lbW9uaWMsXG4gICAgbWFrZUFjY291bnRCeVdpZixcbn0gZnJvbSAnLi9hdXRoJ1xuXG5leHBvcnQge2lzVmFsaWRXaWZ9IGZyb20gJy4vYXV0aC9rZXlzL2VjYydcblxuZXhwb3J0IHtkZWZhdWx0IGFzIENoYWluc1NpbmdsZXRvbn0gZnJvbSAnLi9ibG9ja2NoYWluL2NoYWluc1NpbmdsZXRvbidcblxuZXhwb3J0IHtkZWZhdWx0IGFzIFJlYWRBcGl9IGZyb20gJy4vYmxvY2tjaGFpbi9yZWFkQXBpJ1xuZXhwb3J0IHtUYWJsZUNvZGVDb25maWd9IGZyb20gJy4vYmxvY2tjaGFpbi90eXBlcydcbmV4cG9ydCB7ZGVmYXVsdCBhcyBCYXNlQ29udHJhY3R9IGZyb20gJy4vYmxvY2tjaGFpbi9jb250cmFjdHMvYmFzZSdcbiJdfQ==