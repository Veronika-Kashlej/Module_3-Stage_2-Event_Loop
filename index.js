function findPrimes(start, end, chunkSize) {
  const startTime = Date.now();

  // Validate input parameters
  if (start < 1) {
    console.log("Enter correct start value");
    return Promise.reject("Invalid start value");
  }
  if (end > 100_000_000) {
    console.log("Enter correct end value");
    return Promise.reject("Invalid end value");
  }

  const primes = [];
  let chunkStart = start;
  const totalNumbers = end - start + 1;
  let processedCount = 0;
  let lastReportedProgress = 0;

  return new Promise((resolve) => {
    function processChunk() {
      const chunkEnd = Math.min(chunkStart + chunkSize, end);
      const chunkStartTime = Date.now();

      for (let i = chunkStart; i < chunkEnd; i++) {
        if (isPrime(i)) {
          primes.push(i);
        }

        processedCount++;

        // Report progress in 10% increments
        const progress = (processedCount / totalNumbers) * 100;
        if (Math.floor(progress / 10) > Math.floor(lastReportedProgress / 10)) {
          console.log(`progress: ${Math.floor(progress)}%`);
          lastReportedProgress = progress;
        }

        if (Date.now() - chunkStartTime > 16) {
          chunkStart = i + 1;
          setTimeout(processChunk, 0);
          return;
        }
      }

      // Check if all numbers have been processed
      if (chunkEnd === end) {
        const totalTime = Date.now() - startTime;
        console.log(`progress: 100%`);
        console.log(`This function took ${totalTime} ms`);
        console.log(`Number of found prime numbers: ${primes.length}`);
        resolve(primes);
      } else {
        chunkStart = chunkEnd;
        setTimeout(processChunk, 0);
      }
    }

    processChunk();
  });
}

function isPrime(number) {
  if (number < 2) return false;
  if (number === 2 || number === 3) return true;
  if (number % 2 === 0 || number % 3 === 0) return false;

  // Check divisors up to sqrt(number)
  for (let i = 5; i * i <= number; i += 6) {
    if (number % i === 0 || number % (i + 2) === 0) {
      return false;
    }
  }
  return true;
}

// Usage
findPrimes(1, 508834, 50)
  .then((primes) => console.log("Completed!"))
  .catch((error) => console.error("Error:", error));
