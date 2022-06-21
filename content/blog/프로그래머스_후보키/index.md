---
title: "[프로그래머스] 2019 카카오 블라인드 - 후보키 (JavaScript)"
date: "2022-06-21"
description: "이게 정말 Lv.2 ..?"
tags: ["Algorithm"]
---

# 문제

https://programmers.co.kr/learn/courses/30/lessons/42890

# 풀이

> !! 제 풀이는 정답이 아닙니다.<br>문제를 해결하기 위해 어떻게 접근했는지 봐주세요.

다음과 같은 순서로 풀었다.

1. 유일성을 검사하기 위해 relation의 컬럼의 길이만큼 나올 수 있는 인덱스의 조합(combinations)을 구한다.
2. 인덱스 조합을 순회하면서 relation의 모든 row를 탐색한다. 해당 인덱스로 찾은 attribute값이 중복되는지 확인하여 유일성을 검증한다.
3. 유일성을 만족하는 조합을 순회한다. 조합의 첫 번째 값을 남겨두고, 전체 조합에서 해당 값을 포함하는 값을 삭제한다.
4. 남은 값의 수를 반환한다.

## 코드

```js
/**
 * array 인자의 원소로 이루어진 조합이 담긴 배열을 반환하는 함수.
 * @param {[]} array 원본 배열
 * @param {Number} length 조합을 만드는 원소의 개수
 * @returns {[]}
 */
function getCombinations(array, length) {
    if (length === 1) return array.map(value => value); // 하나의 원소로 조합하는 경우
    const result = [];

    array.forEach((value, index, origin) => {
        const rest = origin.slice(index + 1); // value를 제외하고 원본 배열을 slice
        const combinatons = getCombinations(rest, length - 1); // slice한 배열로 다시 getCombinations() 메서드를 호출
        const attached = combinatons.map(combination => [value, ...combination].join('')) // 반환된 값을 순회하며 value와 각 원소를 더해 조합을 만듬
        result.push(...attached)
    })
    return result;
}

/**
 * solution
 * @param {[[String]]} relation 
 * @returns {Number}
 */
function solution(relation) {
    const answer = [];
    const indexArray = Array.from({ length: relation[0].length }, (_, i) => `${i}`); // 인덱스 조합을 구하기 위한 배열. 0부터 컬럼의 길이만큼 1씩 더한 정수를 문자열로 캐스팅된 값을 원소로 갖는다.
    let combinations = indexArray.flatMap((value) => { // getCombination() 함수에서 반환되는 값이 Array이므로 2차원 배열이 만들어진다. 평탄화 작업을 위한 flatMap() 사용.
        return getCombinations(indexArray, +value + 1);
    });

    
    // 인덱스의 조합으로 유일성을 검증한다.
    combinations = combinations.filter((combination) => {
        const set = new Set()
        for (const row of relation) { // relation을 순회한다.
            let dataString = '';
            for (const index of combination) { // 중복되는 값을 필터링 하기 위해서 조합의 index로 row에서 값을 찾아 문자열로 만든다.
                dataString += row[index]
            }
            set.add(dataString);
        }
        return set.size === relation.length // Set에 저장된 값의 크기와 relation의 길이가 같다면 해당 인덱스로 조합된 attribute는 중복되지 않으므로 유일성이 보장된다.
    });

    // 유일성이 검증된 조합에서 최소성을 검증한다.
    while (combinations.length) {
        const frontCombination = combinations[0].split(''); // 조합은 오름차순으로 정렬되어 있기에 제일 첫 번째 요소를 가져온다.
        answer.push(frontCombination); // 유일성이 검증된 조합 중 제일 첫 번째 값은 최소성이 보장된다. 
        // 위 로직을 반복하기 위해 조합을 순회하면서, 최소성이 보장되지 않는 값들을 제외시킨다.
        const temp = [];
        for (const combination of combinations) {
            frontCombination.forEach((number) => { // 위에서 구한 첫 번째 값을 순회하여 자리수(index)를 구한다.
                if (!combination.includes(number)) { // 만약 combination값이 조합에 포함되어 있다면, 최소성을 만족하지 않는다.
                    temp.push(combination)
                }
            });
        };
        combinations = temp; // 순회중인 조합을 최소성 검증이 계속해서 필요한 배열로 교체한다.
    }
    return answer.length;
}
```

# 후기

유일성을 검증하는 로직까지는 쉽게 구현할 수 있었는데, 문제는 최소성을 검증하는 로직이었다.

지문에 표기된 최소성을 읽고, 처음에는 최소성을 검증하기 위해 최소성이 보장되지 않는 값들을 제외시키지 않고, 조합을 순회하면서 각 index에 해당하는 값이 이미 최소성이 보장된 조합의 요소 중에 하나라도 포함되어 있다면 최소성을 보장하게끔 구현했다.

후보키가 만약 [0, 13, 14, ...] 와 같다면, 유효성을 검사한 조합에서 14을 검증하는 순서에 이미 1이 [0, 13] 중 13에 포함되어 있기 때문에 최소성을 검증하지 못하고 넘어가버린다. 해당 케이스를 찾는데 진짜 오래 걸렸다.

그릐고, 이 문제가 Lv.2 문제라는 것에 명치를 세게 맞은 것 같았다. 🥲