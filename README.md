# DIY IOC

This uses the current [ES Decorators proposal](https://github.com/tc39/proposal-decorators), not the experimental one offered by TypeScript < 5.
No metadata is used. This makes it necessary to provide the IoC keys explicitly.


## Usage Recipe

### 1. define provides

Defined in the demo [here](src/demo/setupProvides.ts)

```ts

// We're setting up the John class to be the provider (of the IChat interface) using key 'IChat'.
// The 3rd argument defines the constructor parameters that the IoC will use to instantiate it at first @inject call
provide('IChat', John, [42]);

// We're setting up the Particle class to be the provider (of the IParticle interface) using key 'IParticle'
// the constructor parameters aren't expected to be exercised as it's up to us to instantiate particles
provide('IParticle', Particle);
```

### 2. get them

Defined in the demo [here](src/demo/runGame.ts).

Inject field or assign `getInstance` to it, if we want a singleton.

```ts
class Bananas {
    @inject('IChat') chatty: IChat;

    // ...

    someMethod() {
        console.log(this.chatty.chat()); // as IChat defines the chat(): string method
    }
}
```


Get classes via `getClass`, if not.

```ts
const Particle = getClass<IParticle>('IParticle');
const p1 = new Particle(2, 1);
```

## Discussion

This is more verbose, straightforward and less magical when compared to [typescript-ioc](https://github.com/thiagobustamante/typescript-ioc). The consumer doesn't need to be using typescript.

The value of the decorator is minimal as compared to the `getInstance` function.

The provider interface should always be exported and used in place of the actual implementation by everyone apart from the implementation itself.

If we were to adopt a rule, we could derive the key lookup from class field name. ie `@inject iChat:IChat;` but we would still need to type the attribute.

## References

- [Dr. Rauschmayer's excellent article on decorators](https://2ality.com/2022/10/javascript-decorators.html)
- [new TS decorators based off latest proposal](https://devblogs.microsoft.com/typescript/announcing-typescript-5-0-beta/#decorators)
- [old experimental TS decorators](https://www.typescriptlang.org/docs/handbook/decorators.html)
