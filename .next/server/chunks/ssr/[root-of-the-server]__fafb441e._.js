module.exports = [
"[turbopack]/browser/dev/hmr-client/hmr-client.ts [app-ssr] (ecmascript, async loader)", ((__turbopack_context__) => {

__turbopack_context__.v((parentImport) => {
    return Promise.all([
  "server/chunks/ssr/[turbopack]_browser_dev_hmr-client_hmr-client_ts_818f0fdf._.js"
].map((chunk) => __turbopack_context__.l(chunk))).then(() => {
        return parentImport("[turbopack]/browser/dev/hmr-client/hmr-client.ts [app-ssr] (ecmascript)");
    });
});
}),
"[project]/node_modules/viem/_esm/utils/ccip.js [app-ssr] (ecmascript, async loader)", ((__turbopack_context__) => {

__turbopack_context__.v((parentImport) => {
    return Promise.all([
  "server/chunks/ssr/node_modules_viem__esm_68d00684._.js"
].map((chunk) => __turbopack_context__.l(chunk))).then(() => {
        return parentImport("[project]/node_modules/viem/_esm/utils/ccip.js [app-ssr] (ecmascript)");
    });
});
}),
"[project]/node_modules/@noble/curves/esm/secp256k1.js [app-ssr] (ecmascript, async loader)", ((__turbopack_context__) => {

__turbopack_context__.v((parentImport) => {
    return Promise.resolve().then(() => {
        return parentImport("[project]/node_modules/@noble/curves/esm/secp256k1.js [app-ssr] (ecmascript)");
    });
});
}),
];