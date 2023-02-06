# DIY IOC

This uses the current [ES Decorators proposal](https://github.com/tc39/proposal-decorators), not the experimental one offered by TypeScript < 5.
No metadata is used. This makes it necessary to provide the IoC keys explicitly.


## Usage Recipe

### step 1. define providers

```ts

// We're setting up the John class to be the provider (of the IChat interface) using key 'IChat'.
// The 3rd argument defines the constructor parameters that the IoC will use to instantiate it at first @inject call
provide('IChat', John, [42]);

// We're setting up the Particle class to be the provider (of the IParticle interface) using key 'IParticle'
// the constructor parameters aren't expected to be exercised as it's up to us to instantiate particles
provide('IParticle', Particle);
```

### step 2a. get singletons

```ts
class Bananas {
    @inject('IChat') chatty: IChat;

    // ...

    someMethod() {
        console.log(this.chatty.chat()); // as IChat defines the chat(): string method
    }
}
```


### step 2b. get classes (for non-singletons)

```ts
const Particle = getClass<IParticle>('IParticle');
const p1 = new Particle(2, 1);
```

## Discussion

This is more verbose, straightforward and less magical when compared to [typescript-ioc](https://github.com/thiagobustamante/typescript-ioc).
Another difference is that the consumer of this IoC thing doesn't need to be using typescript.

The value of the decorator is minimal. One could use the `getInstance` function I'm exposing instead.

I suggest the provider interface should always be exported and used in place of the actual implementation everyone apart from the implementation itself.

If we were to adopt a rule, we could derive the key lookup from class field name.

## References

- [Dr. Rauschmayer's excellent article on decorators](https://2ality.com/2022/10/javascript-decorators.html)
- [new TS decorators based off latest proposal](https://devblogs.microsoft.com/typescript/announcing-typescript-5-0-beta/#decorators)
- [old experimental TS decorators](https://www.typescriptlang.org/docs/handbook/decorators.html)
