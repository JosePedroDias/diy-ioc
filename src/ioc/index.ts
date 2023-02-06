const provided: Map<string, any> = new Map<string, any>();
const providedCtorParams: Map<string, any[]> = new Map<string, any[]>();
const instances: Map<string, any> = new Map<string, any>();

/*
Provides are expected to be fulfilled at bootstrap
For singletons, the constructor parameters should be passed in as arguments, as it's this module 
 */
export function provide(key: string, value: any, ctorParams: any[] = []): void {
    if (provided.has(key)) {
        throw new Error(`Key '${key}' has been provided before?`);
    }

    provided.set(key, value);
    providedCtorParams.set(key, ctorParams);
}

/*
Provides an implementation class from the key
Do not call this directly for singletons!
 */
export function getClass<T>(key: string): { new (): T } {
    const Class = provided.get(key);
    if (!Class) throw new Error(`'${key}; has not been provided!`);
    return Class;
}

export function getInstance<T>(key:string): T {
    let inst = instances.get(key);
    if (inst) return inst;

    const Class = getClass(key);
    const ctorParams: any[] = providedCtorParams.get(key) || [];

    // @ts-ignore
    inst = new Class(...ctorParams);
    instances.set(key, inst);

    return inst;
}

/*
 decorator version of getInstance
    context:
        kind: 'field'
        name: 'chatty'
        private: false
        static: false
        addInitializer: f
 */
export function inject(key: string) {
    return (_target: any, _context: any) => {
        return () => getInstance(key) as any;
    }
}

/* context
        kind: 'method'
        name: 'go'
        private: false
        static: false
        addInitializer: f
 */
/*export function loggedMethod(originalMethod: any, context: any) {
    console.log(context);

    const methodName = String(context.name);

    function replacementMethod(this: any, ...args: any[]) {
        console.log(`LOG: Entering method '${methodName}'.`)
        const result = originalMethod.call(this, ...args);
        console.log(`LOG: Exiting method '${methodName}'.`)
        return result;
    }

    return replacementMethod;
}*/
