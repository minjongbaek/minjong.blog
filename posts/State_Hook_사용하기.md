---
title: State Hook 사용하기
date: "2022-01-29 21:00"
description: "React의 useState Hook은 함수형 컴포넌트에서 state를 사용할 수 있게 해준다."
tags: ["React"]
---
# State Hook?

React의 `useState` Hook은 함수형 컴포넌트에서 state를 사용할 수 있게 해준다.

함수 컴포넌트는 this를 가질 수 없기 때문에 클래스 컴포넌트 처럼 생성자 함수 내에서 state 변수를 선언할 수 없다. `useState` Hook을 컴포넌트에 호출하여 state 변수를 선언할 수 있다.

## State 변수 선언하기

`useState` 함수는 state 변수와 해당 변수의 값을 수정할 수 있는 함수를 반환한다. 따라서, JS의 구조분해 할당을 이용해 `const [state, setState] = useState(변수 초기값)` 형태로 사용한다. 

아래 코드는 `count`라는 state 변수를 선언하고 0으로 초기화한다.

```js
import React, { useState } from "react";

const TestComponent = () => {
  // 클래스 컴포넌트의 this.state.count, this.setState와 유사
  const [count, setCount] = useState(0);
  ...
}
```

`count` 변수의 값을 변경할 때는 `setCount`를 호출한다. React는 `count` 변수를 리렌더링할 때 기억하고, 가장 최근에 갱신된 값을 반환한다.

## state 사용하기

선언한 state 변수는 바로 사용할 수 있다. 아래는 state 변수인 카운트의 숫자를 표시하고 값을 변경하는 컴포넌트다.

```jsx{numberLines: true}
import React, { useState } from "react";

const TestComponent = () => {
  const [count, setCount] = useState(0);
  return (
    <div>
      <p>You clicked {count} times</p>
      <button onClick={() => setCount(count + 1)}>Click me</button>
    </div>
  );
};

export default TestComponent;

```

버튼을 누르면 `setCount` 함수를 호출하여 현재 `count` 변수의 값에 1을 더해 갱신하고 React는 새로운 count 변수를 `TestComponent`에 전달 후 리렌더링한다.

![](/images/State_Hook_사용하기/Screen-Recording.gif)