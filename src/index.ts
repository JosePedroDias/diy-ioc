/**
 * https://2ality.com/2022/10/javascript-decorators.html
 * https://devblogs.microsoft.com/typescript/announcing-typescript-5-0-beta/
 * ClassMethodDecoratorContext
 */

const provided: Map<string, any> = new Map<string, any>();
const providedCtorParams: Map<string, any[]> = new Map<string, any[]>();
const instances: Map<string, any> = new Map<string, any>();

/*
 * 
 * 
 */
export function provide(key: string, value: any, ctorParams: any[]) {
    if (provided.has(key)) {
        throw new Error(`Key '${key}' has been provided before?`);
    }

    provided.set(key, value);
    providedCtorParams.set(key, ctorParams);
}

/*
 * context
        kind: 'field'
        name: 'go'
        private: false
        static: false
        addInitializer: f
 */
export function inject<T>(value: any, context: any) {
    console.log(`inject`, value, context);

    return 'X';
}


/*
    context
        kind: 'method'
        name: 'go'
        private: false
        static: false
        addInitializer: f
 */
export function loggedMethod(originalMethod: any, context: ClassMethodDecoratorContext) {
    console.log(context);

    const methodName = String(context.name);

    function replacementMethod(this: any, ...args: any[]) {
        console.log(`LOG: Entering method '${methodName}'.`)
        const result = originalMethod.call(this, ...args);
        console.log(`LOG: Exiting method '${methodName}'.`)
        return result;
    }

    return replacementMethod;
}


/*
 * context
        kind: 'field'
        name: 'go'
        private: false
        static: false
        addInitializer: f
 */
export function testAttribute(target: any, context: any) {
    console.log('target', target);
    console.log('context', context);
    target *= 2;
    return target;
}
