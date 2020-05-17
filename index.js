const fi = (function() {
  return {
    libraryMethod: function() {
      return 'Start by reading https://medium.com/javascript-scene/master-the-javascript-interview-what-is-functional-programming-7f218c68b3a0'
    },

    each: function(collection, callback) {
      const collectionCopy = Object.assign({}, collection)

      if (Array.isArray(collectionCopy)) { // array 
        for (let i = 0; i < collectionCopy.length; i++) {
          callback(collectionCopy[i])
        }
      } else { // object 
        const values = Object.values(collectionCopy)
        for (let i = 0; i < values.length; i++) {
          callback(values[i])
        }        
      }

      return collection 
    },

    map: function(collection, callback) {
      let newArray = []
      if (Array.isArray(collection)) { // array 
          newArray = collection.map(callback)
      } else { // object 
        const values = Object.values(collection)
          newArray = values.map(callback)              
      }
      return newArray
    },

    reduce: function(collection, callback, acc) {
      if (acc == 0 || acc == undefined) {
        return collection.reduce(callback)
      } else {
        return collection.reduce(callback, acc)
      }
    },

    find: function(collection, predicate) {
      return collection.find(predicate)
    },

    filter: function(collection, predicate) {
      return collection.filter(predicate)
    },

    size: function(collection) {
      if (Array.isArray(collection)) { // array 
        return collection.length
      } else { // object 
        const values = Object.values(collection)
          return values.length               
      }
    },

    first: function(array, count = 1) {
      const newArray = array.slice(0, count)

      if (newArray.length == 1) {
        return Number(newArray[0])
      } else {
        return newArray.map(x => Number(x))
      }
      
    },

    last: function(array, count = 1) {
      const newArray = array.slice((array.length - count))
      
      if (newArray.length == 1) {
        return Number(newArray[0])
      } else {
        return newArray.map(x => Number(x))
      }

    },

    compact: function(array) {
      return array.filter(x => !!x)
    },

    sortBy: function(array, callback) {
      const arrayCopy = [...array]
      return arrayCopy.sort((a, b) => callback(a) - callback(b))    
    }, 

    flatten: function(array, shallow = false) {
      if (shallow == true) {
        return array.flat()
      } else {
        return array.flat(Infinity)
      }
    },

    uniq: function(array, sorted, callback) {       
      if (!!callback) {
        let unique = new Set()
        let newArray = array.map(callback)
        let duplicateIndex = []

        for (let i = 0; i < newArray.length; i++) {
          const currentValue = newArray[i]
          if (unique.has(currentValue)) {
            duplicateIndex.push(i)
          } else {
            unique.add(currentValue)
          }
        }

        for (let i = (duplicateIndex.length - 1); i >=0 ; i--) { // since we are modifying the array we iterate through, we need to start at the end and decrement
          array.splice(duplicateIndex[i], 1)
        }
        
        return array 
      } else {
        // if no callback provided 
        return Array.from(new Set(array))
      }      
    }, 

    keys: function(obj) {
      const keys = []
      for (const key in obj) {
        keys.push(key)
      }
      return keys 
    }, 

    values: function(obj) {
      const values = []
      for (const key in obj) {
        values.push(obj[key])
      }
      return values 
    },

    functions: function(obj) {
      const functionList = []
      for (const key in obj) {
        if (typeof obj[key] === "function") {
          functionList.push(obj[key])
        }
      }
      return functionList.sort()
    }

  }
})()

fi.libraryMethod()
