# squirrel-jump
My solution for the squirrel jump problem.

## Description
The full instruction could be found here: [Squirrel Jump](https://leetcode.com/discuss/interview-question/482899/Squirrel-jump-problem?fbclid=IwAR2BWteYhvUVXax3k-E3JEgXJG48TtCng7ityeP0ztA21IlpkbegNHNVo5I).

However, the short version is the squirrel can jump a maximum of two steps, either right or left, per jump, and only land on a bar that is shorter than the current bar. The question is, how many jumps is the maximum number of jumps the squirrel can jump, and which bars does the squirrel land on to get there?

Provided API not visible in the description was:
| Name | Signature | Description |
| --- | --- | --- |
|`getHeightAt` | `Number` -> `Number` | A function that returns the height of the bar at the provided index |
|`getNumberOfBars` | `()` -> `Number` | The length of the bar array |

## My solution
The input is an array of integers (the bar heights). But, by treating it as a directed graph where each item has successors (bars within two steps that is shorter), it was possible to do a depth-first search and save all available paths and then pick the longest one.

To make the implementation easier to test, it takes the API as a dependency.

## Run it
As long as you have node and npm installed all you have to do is:
1. `npm install`
2. `npm test`
