async function findPrimes(start, end, chunkSize, batchSize) {
  // Record the start time of the execution
  const startTime = Date.now();

  // Validate input parameters
  if (start < 1) {
    console.log("Enter correct start value");
    return;
  }
  if (end > 100_000_000) {
    console.log("Enter correct end value");
    return;
  }

  const totalChunks = Math.ceil((end - start + 1) / chunkSize);
  let lastReportedProgress = 0;
  const allPrimes = [];

  for (let chunkStart = start; chunkStart <= end; chunkStart += chunkSize) {
    const chunkEnd = Math.min(chunkStart + chunkSize - 1, end);
    const batchPromises = [];
    for (
      let batchStart = chunkStart;
      batchStart <= chunkEnd;
      batchStart += batchSize
    ) {
      const batchEnd = Math.min(batchStart + batchSize - 1, chunkEnd);
      batchPromises.push(
        new Promise((resolve) => {
          const primes = [];
          for (let num = batchStart; num <= batchEnd; num++) {
            if (isPrime(num)) {
              primes.push(num);
            }
          }

          resolve(primes);
        })
      );

      const progress = Math.round((chunkEnd / totalChunks) * 100);

      if (progress >= lastReportedProgress + 10) {
        console.log(`progress: ${progress}%`);
        lastReportedProgress = progress;
      }
    }
    const batchResults = await Promise.all(batchPromises);
    allPrimes.push(...batchResults.flat());
  }

  console.log(`Number of found prime numbers: ${allPrimes.length}`);
  console.log(`This function taked ${Date.now() - startTime} ms`);

  return allPrimes;
}

function isPrime(number) {
  if (number < 2) return false;
  if (number === 2) return true;
  if (number % 2 === 0) return false;

  // Check odd divisors up to the square root of the number
  for (let i = 3; i <= Math.sqrt(number); i += 2) {
    if (number % i === 0) {
      return false;
    }
  }

  return true;
}

findPrimes(1, 100000000, 1, 10)
  .then(() => {
    console.log("Completed!");
  })
  .catch((err) => {
    console.log(`Error: ${err}`);
  });
