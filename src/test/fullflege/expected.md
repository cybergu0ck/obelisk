<br/>
<br/>
<br/>
<br/>

# 76. Minimum Window Substring

Hard [level question on leetcode](https://leetcode.com/problems/minimum-window-substring/description/).

<br/>
<br/>
<br/>

## Clarifications

- Can strings be empty?
  - No. both strings contain atleast one character.

- What is the type of characters in the strigns?
  - s and t consist of uppercase and lowercase English letters.

<br/>
<br/>
<br/>

## Test cases

| Case                 | Input                        | Output   |
| -------------------- | ---------------------------- | -------- |
| Same strings         | s = "abc" & t = "abc"        | "abc"    |
| No window            | s = "abc" & t = "xyz"        | ""       |
| Simple case          | s = "ab" & t = "b"           | "b"      |
| t is larger than s   | s = "ab" & t = "abc"         | ""       |
| Order doesn't matter | s = "axxba" & t = "ab"       | "ba"     |
| Consider duplicates  | s = "axxbxab" & t = "abb"    | "byab"   |
| Consider duplicates  | s = "aaabc" & t = "aab"      | "aab"    |
| Better option later  | s = "axbxcxabc" & t = "abc"  | "abc"    |
| Better option later  | s = "aaabbcdd" & t = "abcdd" | "abbcdd" |

<br/>
<br/>
<br/>

## Solution

<br/>
<br/>

### Quadratic solution

```py
from collections import defaultdict

class Solution:
    def isSatisfied(self, targetMap, curMap) -> bool:
        res = True
        for item in targetMap: # O(1) since characters are bounded to english alphabets
            if curMap[item] < targetMap[item]:
                res = False
                break
        return res


    def minWindow(self, s: str, t: str) -> str:
        targetMap = defaultdict(int)
        for ch in t:
            targetMap[ch] += 1

        curMap = defaultdict(int)
        start = 0
        res = ""
        for i in range(len(s)): #O(m); m is the number of characters in 's'
            if s[i] not in targetMap:
                curMap['junk'] += 1
            else:
                curMap[s[i]] += 1

            if self.isSatisfied(targetMap, curMap): #O(1)
                curLen = len(s[start:i+1])
                if len(res) == 0 or curLen < len(res):
                    res = s[start:i+1]

                for j in range(start, i): #O(m)
                    if s[j] not in curMap :
                        curMap['junk'] -= 1
                        start += 1
                        if self.isSatisfied(targetMap, curMap):
                            curLen = len(s[start:i+1])
                            if len(res) == 0 or curLen < len(res):
                                res = s[start:i+1]
                    elif s[j] in curMap and curMap[s[j]] > targetMap[s[j]]:
                        curMap[s[j]] -= 1
                        start += 1
                        if self.isSatisfied(targetMap, curMap):
                            curLen = len(s[start:i+1])
                            if len(res) == 0 or curLen < len(res):
                                res = s[start:i+1]
                    else:
                        break
        return res

```

```cpp

```

<br/>

#### Explanation

Apply sliding window technique using hash maps.

1. Create the `targetMap` hash map.
1. Iterate over 's'
   - Update `curMap` hash map.
   - If current window contains the necessary characters
     - Update result.
     - Iterate over current window.
       - Remove junk characters from `curMap` and update `start` pointer.
       - Remove necesary characters until `curMap[s[j]] > targetMap[s[j]]` i.e. current window doesn't contain the exact necesary characters.

<br/>

#### Complexity analysis

- Time Complexity : This is a quadratic, $O(n^2)$ solution in terms of time, where $n$ is length of string 's'.
  - $O(m)$ is required to create `targetMap`, where 'm' is the number of characters in string 't'.
  - The algorithm consists of nested for loop.
    - The outer loop iterates over every character in 's', hence $O(n)$.
    - The inner loop also iterates over every character in 's' in the worst case (ex: s='aaaaab' t='b'), hence $O(n)$.
    - The `isSatisfied` call's can be considered constant time $O(1)$ as only english alphabets are used (given constraint).
    - Overall the time complexity would be $O(n^2 + m)$.

- Space Complexity : This is a constant, $O(1)$ solution in terms of space.
  - since only english alphabets are used (given constaint).

<br/>
<br/>

### Efficient solution

```py
from collections import defaultdict

class Solution:

    def minWindow(self, s: str, t: str) -> str:
        targetMap = defaultdict(int)
        for ch in t: #O(n)
            targetMap[ch] += 1

        curMap = defaultdict(int)
        start = 0
        res = ""
        have = 0
        need = len(targetMap)

        for i in range(len(s)): #O(m)
            ch = s[i]
            curMap[ch] += 1

            if ch in targetMap and curMap[ch] == targetMap[ch]:
                have += 1
            while have == need:
                curLen = len(s[start:i+1])
                if len(res) == 0 or curLen < len(res):
                    res = s[start:i+1]
                val = s[start]
                curMap[val] -= 1
                start += 1
                if val in targetMap and curMap[val] < targetMap[val]:
                    have -= 1

        return res

```

```cpp

```

<br/>

#### Explanation

<!-- one line desctiption of the logic of the algorithm -->
<!-- detailed explanation with steps if appropriate -->

<br/>

#### Complexity analysis

- Time Complexity : This is a <!-- time complexity in english -->, $O()$ solution in terms of time, where $ $ is <!-- placeholder -->.
- Space Complexity : This is a <!-- time complexity in english -->, $O()$ solution in terms of space, where $ $ is <!-- placeholder -->.

<br/>
<br/>
<br/>

## Follow ups

<br/>
<br/>
<br/>

## Notes

<br/>
<br/>
<br/>

## Resources
