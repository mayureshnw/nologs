export default (fileInfo, api) => {
    const j = api.jscodeshift;

    return j(fileInfo.source)
        .find(j.CallExpression, {
            callee: {
                type: 'MemberExpression',
                property: {
                    type: 'Identifier',
                    name: 'log'
                },
            }
        })
        .remove()
        .toSource()
};
