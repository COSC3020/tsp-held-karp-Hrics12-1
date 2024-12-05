# Traveling Salesperson Problem -- Held-Karp Algorithm

This exercise is about the Traveling Salesperson Problem I mentioned in the
lecture on NP-hard problems -- given a set of cities, determine the length of
the shortest tour that visits all of them. We can get from any city to any other
city, i.e. the graph of cities is completely connected. We consider the version
of the Traveling Salesperson Problem that finds the shortest tour to visit $n$
cities, starting at a city and ending at the $n$ th city; it *does not* go
back to the start. The start city may be any of the cities. Remember that the
graph for a TSP is undirected, i.e. the cost is the same in either direction.

The Held-Karp algorithm for solving the Traveling Salesperson Problem is a
recursive algorithm that considers every subset of cities and finds shortest
tours within them. It takes advantage of the fact that every subroute of a route
of minimum length is of minimum length itself. The main idea is that to solve
the problem of finding the shortest route for $n$ cities, we first solve the
problem of finding the shortest route for $n-1$ cities, and then find the
shortest route from the $n-1$st city to the $n$th city. The pseudocode for the
algorithm is as follows:

```javascript
// cities is the set of cities not visited so far, including start
heldKarp(cities, start)
  if |cities| == 2
    return length of tour that starts at start, goes directly to other city in cities
  else
    return the minimum of
      for each city in cities, unless the city is start
        // reduce the set of cities that are unvisited by one  (the old start), set the new start, add on the distance from old start to new start
        heldKarp(cities - start, city) + distance from start to city
```

Implement a dynamic programming version (which could use memoization) of the
Held-Karp algorithm. If you use memoization, make sure that the cache is reset
every time the function is called such that multiple calls do not end up using
old and incorrect values. Start with the template I provided in `code.js`.

The function takes a distance matrix (the adjacency matrix for the graph where
the values in the cells are the distances between the corresponding cities) and
returns the length of the shortest tour (not the tour itself).

Test your new function; I've provided some basic testing code in `code.test.js`.

## Runtime Analysis

What is the worst-case asymptotic time complexity of your implementation? What
is the worst-case asymptotic memory complexity? Add your answer, including your
reasoning, to this markdown file.

So, the heldKarp function looks for the minimum cost of visiting every city recursively. For each city it checks the two paths once where $n$ is the amount of cities so this gives you $2^n$. Then the key is used to cache and adds the sorted list of cities and current starting city. So it's checking the results for each subset of cities and each potential starting city. This is $n$ for the potential starting cities. So that would give you $O(n * 2^n)$ for the possible sub-cities and possible starting cities. Then there is $n$ work for each iteration of the heldKarp function when it goes over all the cities to find the shortest paths. The worst-case time complexity would be $O(n * 2^n) * O(n) = O(n^2*2^n)$ 

The worst-case memory complexity would be the cache and then the recursive stack. The cache is still $O(n * 2^n)$ and the recursive stack is just $n$ for the amount of cities. So $O(n * 2^n) + O(n) = O(n * 2^n)$


https://www.geeksforgeeks.org/lambda-expressions-in-javascript/

https://compgeek.co.in/held-karp-algorithm-for-tsp/

https://hevawu.github.io/blog/2021/07/23/Held-Karp-algorithm

https://www.w3schools.com/js/js_json_stringify.asp

I had to take a peek at Sean's heldKarp function, I wasn't getting the base case correct.
https://github.com/COSC3020/tsp-held-karp-swilso59

I was trying to use this spread operator before cities to convert to a set.

```javascript
if (cities.size === 2) {
    const [city1, city2] = [...cities]; 
    const result = dist[city1][city2];
    cache[key] = result;
    return result;
}
```


"I certify that I have listed all sources used to complete this exercise, including the use of any Large Language Models. All of the work is my own, except where stated otherwise. I am aware that plagiarism carries severe penalties and that if plagiarism is suspected, charges may be filed against me without prior notice."
