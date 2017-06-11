# xogox go engine
> a functional javascript game engine

--

## Dev Log

### 11/06/2017 - First setup

The current goal is just to experiment. I've got no experience in game development but a lot of web and functional programming experience. While this project is just a concept right now, I have an architecture in mind that will guide my initial tests. It is largely based on [redux](https://github.com/reactjs/redux).

The goal is to have the whole engine transparent and pluggable.
You mantain a single state object for your whole app.
It is passed around between your various modules.
All your modules must be named reducers.

Your modules are composed together.
Your modules may be altered by pluggable enhancers.

#### Quick start

This is how a game can be started up.

```javascript
// ./src/app.js

go([ ...modules ])([ ...enhancers ]);

```

Due to our highly componentized structure, it's easy to imagine higher order functions that wrap certain defaults like setup handling, physics, object pooling and rendering.

#### Modules

```javascript
// ./src/modules/render

const renderModule = {
  id: 'xogo.render',
  reducer: (app) => {

    return {
      ...app,
      rendered: true
    };

  }
}

export default renderModule;

```

A module is defined by it's id and reducer.

The id can be used when working with enhancers that target specific modules.
Since nothing prevents ids from clashing it's advised that you follow the `creator.moduleName` pattern.

The reducer receives the current app state.
Deals with it then returns the altered state so the loop continues.

#### Side effects

Normally, handling side effects like fetching resources on a functional loop should be avoided. But since this is so common we must define a standard so we can deal with this 'anti-pattern' in the most predictable way.

One way to do this is to store a mutable object inside our immutable state. **WHAT?** Yes. We will have to deal with this object differently and none of it's changes will be apparent when comparing root states. But at least this way we can continue to deal with pure modules even when dealing with async sideeffects.

Something like this:

```

   :
   | module -> check state -> async action
   | module -> no changes          |
   | module -> no changes          |
   | module -> no changes     change state
   | module -> deal with changes
   :

```

#### Thoughts

The choice of dealing with this in a proprietary way instead of doing things completely based on redux may not be the wisest choice. But I believe doing things with redux actions instead of sequential reducers will result in loss of performance. This should be tested more carefully.
