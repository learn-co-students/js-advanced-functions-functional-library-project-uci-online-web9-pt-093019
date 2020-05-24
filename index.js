const fi = (function() {
  return {
    libraryMethod: function() {
      return 'Start by reading https://medium.com/javascript-scene/master-the-javascript-interview-what-is-functional-programming-7f218c68b3a0'
    },

    each: function(collection, callback) {
      const iterator = Object.keys(collection)
      
      for (let i=0; i<iterator.length; i++) {
        callback(collection[iterator[i]], iterator[i], collection)
      }

      return collection
    },

    map: function(collection, callback) {
      const iterator = Object.keys(collection)
      const returnArry = []

      for (let i=0; i<iterator.length; i++) {
        returnArry.push(callback(collection[iterator[i]], iterator[i], collection))
      }

      return returnArry
    },

    reduce: function(collection, callback, acc) {
      const iterator = Object.keys(collection)
      let returnTotal = acc

      let i = 0

      if (acc === undefined) {
        returnTotal = collection[iterator[0]]
        i = 1
      }

      for (i; i<iterator.length; i++) {
        returnTotal = callback(returnTotal, collection[iterator[i]], collection)
      }

      return returnTotal
    },

    find: function(collection, predicate) {
      const iterator = Object.keys(collection)
      
      for (let i=0; i<iterator.length; i++) {
        if (predicate(collection[iterator[i]])) {
          return collection[iterator[i]]
        }
      }
    },

    filter: function(collection, predicate) {
      const iterator = Object.keys(collection)
      const returnArry = []

      for (let i=0; i<iterator.length; i++) {
        if (predicate(collection[iterator[i]])) {
          returnArry.push(collection[iterator[i]])
        }
      }
      return returnArry
    },

    size: function(collection) {
      const iterator = Object.keys(collection)

      return iterator.length
    },

    first: function(array, num=1) {
      const returnArry = []

      if (num === 1) {
        return array[0]
      }
      else {
        for (let i = 0; i<num; i++) {
          returnArry.push(array[i])
        }
        return returnArry
      }
    },

    last: function(array, num) {
      const returnArry = []
      
      if (num === undefined) {
        return array[array.length - 1]
      }
      else {
        for (let i=num; i>0; i--) {
          returnArry.push(array[array.length - i])
        }
        return returnArry
      }
    },

    compact: function(array) {
      return fi.filter(array, el => el)
    },

    sortBy: function(array, callback) {
      const sortedArry = [...array]

      return sortedArry.sort((a,b) => {
        if (callback(a) < callback(b)) {return -1}
        else if (callback(a) > callback(b)) {return 1}
        else {return 0}
      })
    },

    flatten: function(array, single=false) {
      const returnArry = []
    
      if (single === true) {
        for (let i=0; i< array.length; i++) {
          if (Array.isArray(array[i])) {
            for (let j=0; j< array[i].length; j++) {
              returnArry.push(array[i][j])
            }
          }
          else {
            returnArry.push(array[i])
            }
        }
        
      }
      else {
        // [1, [2], [3, [[4]]]]
        // [1, [2, [3]]]
      
        let currentElement = array
        let next = []
        while(currentElement || currentElement === 0) {
          console.log(`currentElement = ${currentElement}`)
          console.log(`next in loop = ${next}`)
          // debugger
          if (Array.isArray(currentElement)) {
            for (let i=0; i<currentElement.length; i++) {
              console.log(`next current for loop = ${currentElement[i]}`)
              console.log(`next in for loop = ${next}`)
    
              next.push(currentElement[i])
            }
          }
          else {
            console.log(`element being added to returnArry=${currentElement}`)
            returnArry.push(currentElement)
          }
          currentElement = next.shift()
          
          console.log(`current after next shift=${currentElement}`)
        }    
      }
      return returnArry
    },

    uniq: function (array, isSorted=false, callback) {
      const returnArry = []
      let sortedArry = []

      if (isSorted === false) {
        sortedArry = fi.sortBy(array, el => el)
      }
      else {
        sortedArry = [...array]
      }

      returnArry.push(sortedArry[0])

      if (!!callback) {
        for (let i=1; i<sortedArry.length-1; i++) {
          let a = i
          let b = i + 1

          if (!fi.find(returnArry, el => callback(el) === callback(sortedArry[b]))) {
            returnArry.push(sortedArry[b])
          }
        }
      }
      else {
        for (let i=1; i<sortedArry.length-1; i++) {
          let a = i
          let b = i + 1
         
          if (sortedArry[a] != sortedArry[b]) {
              returnArry.push(sortedArry[b])
            }
        }
      }
      return returnArry
    },

    keys: function(object) {
      return Object.keys(object)
    },

    values: function(object) {
      const objKeys = fi.keys(object)
      const returnArry = []

      for (let i=0; i<objKeys.length; i++) {
        returnArry.push(object[objKeys[i]])
      }
      
      return returnArry
    },

    functions: function(object) {
      const objKeys = fi.keys(object)
      const functionNameArry = []

      for (let i=0; i<objKeys.length; i++) {
        if (typeof(object[objKeys[i]]) === 'function') {
          functionNameArry.push(objKeys[i])
        }
      }
      return fi.sortBy(functionNameArry, el => el)
    }
  }
})()

console.log(fi.flatten([1, [2], [3, [[4]]]]))
console.log(fi.flatten([1, [2], [3, [[4]]]], true))