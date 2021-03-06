---
title: 객체와 배열의 성능평가
date: "2022-02-23"
description: "객체와 배열에 내장된 메소드와 루프들은 얼마나 성능이 좋을까?"
tags: ["Algorithm"]
---

# 객체와 배열

객체와, 배열에 내장된 메소드와 루프들은 얼마나 성능이 좋을까? 배열에서 빠르게 할 수 있는 작업에는 어떤 것이 있을까?

빅오 표기법을 통해 성능을 확인할 수 있다.

## 객체

```js
let instructor = {
  name: "minjong",
  isInstructor: true,
  id: 950420
}
```

객체는 key와 value가 짝지어 저장된다. 객체에 저장된 값에 접근, 입력, 수정, 삭제를 할 때는 key로 접근한다.

객체의 크기나, key의 순서는 상관이 없기 때문에 `O(1)`로 표현할 수 있다. (어떤 방식으로 key에 접근하는지는 추후에 HashMap을 다루면서 자세하게 살펴본다.)

탐색은 key를 찾는 것이 아니다. 어떤 특정한 정보가 어떤 값에 있는지 확인하는 것이다. 시작점에 있는지, 중간점에 있는지 알 수 없기 때문에 잠재적으로는 모든 아이템의 모든 속성을 확인해야할 수 있다.

`950420`이 객체의 어디에 저장되어 있는지 알기 위해서 `name`에 먼저 접근하여 값을 확인하고 `isInstructor`에 접근하여 값을 확인하고 마지막으로 `id`에 접근한다. 그러므로 시간 복잡도는 `O(n)`이다.

![](object-big-o.png)

### 객체의 메소드

* keys: `O(n)`
* values: `O(n)`
* entries: `O(n)`
* hasOwnProperty: `O(1)`

객체에서 탐색을 하는 대표적인 에는 [`keys`](https://developer.mozilla.org/ko/docs/Web/JavaScript/Reference/Global_Objects/Object/keys), [`values`](https://developer.mozilla.org/ko/docs/Web/JavaScript/Reference/Global_Objects/Object/values), [`entries`](https://developer.mozilla.org/ko/docs/Web/JavaScript/Reference/Global_Objects/Object/entries)이다. 해당 메소드는 열거 가능한 모든 속성이나 값들로 이루어진 배열을 리턴하기 때문에 객체의 크기와 실행 시간이 비례한다.

[`hasOwnProperty`](https://developer.mozilla.org/ko/docs/Web/JavaScript/Reference/Global_Objects/Object/hasOwnProperty)는 키를 통해 접근을 하기 때문에 객체의 크기에 크게 영향을 받지 않는다.

## 배열

```js
const names = ["minjong", "minjoo", "heeji"]
```

배열은 어떨까? 배열에서 가장 중요한 점은 정렬되어 있다는 것이다. 정렬되어 있다는 것은 유용할 수 있지만 연산을 하는데 더 시간이 걸릴 수 있다.

배열은 엘리먼트마다 인덱스가 존재하기 때문에. 배열에 접근하는 것은 매우 빠르다.

인덱스로 접근하기 때문에 첫번째 이름에 접근해도 마지막 이름에 접근해도 `O(1)`이다. 배열이 10000개라면 10000까지 세다가 원하는 엘리먼트에 도착했을 때 값을 반환하는 것이 아니라, 인덱스를 통해 엘리먼트에 빠르게 접근할 수 있는 것이다.

배열에서는 어떤 위치에 입력과 제거를 수행하느냐에 따라 수행 시간이 달라진다.

`pop`, `push` 메소드나, 맨 끝 인덱스를 지정하여 값을 추가한다면 `O(1)`으로 표현할 수 있다.

문제는 앞쪽에 값을 추가하거나 제거하는 경우이다. 만약 `shift`, `unshift` 메소드로 맨 앞에 값을 추가하거나 제거한다면 모든 엘리먼트의 인덱스를 새로 배정해야한다. 따라서 `O(n)`으로 표현한다.

배열에서 탐색작업은 가장 빨라도 `O(n)`이다.

만약 1,000,000,000 개의 엘리먼트를 가진 배열에서 특정 값을 확인하려면 찾을 때까지 모든 엘리먼트를 확인해야할 수도 있다. 배열의 크기가 커질수록 시간이 길어지기 때문에 `O(n)`이다.

![](array-big-o.png)

### 배열의 메소드

* push = `O(1)`
* pop = `O(1)`
* shift = `O(n)`
* unshift = `O(n)`
* concat = `O(n)`
* slice = `O(n)`
* splice = `O(n)`
* sort = (N * log N)
* forEach, map, filter, reduce, etc = `O(n)`

배열 메소드에서 연산에 loop가 필요하다면 `O(n)` loop가 필요 없다면 `O(1)`로 표현할 수 있다.

---

# 정리

* 정렬할 필요가 없고, 빠른 탐색을 원하는 경우 객체가 효과적일 수 있다.
* 정렬되어 있다는 것은 유용할 수 있지만 연산을 하는데 더 시간이 걸릴 수 있다.