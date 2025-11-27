async function findPrimes(start, end, chunkSize) {
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

  const chunkPromises = [];
  const totalChunks = Math.ceil((end - start + 1) / chunkSize);
  let completedChunks = 0;
  let lastReportedProgress = 0;

  for (let chunkStart = start; chunkStart <= end; chunkStart += chunkSize) {
    const chunkEnd = Math.min(chunkStart + chunkSize - 1, end);

    chunkPromises.push(
      new Promise((resolve) => {
        setTimeout(() => {
          const primes = [];
          for (let i = chunkStart; i <= chunkEnd; i++) {
            if (isPrime(i)) {
              primes.push(i);
            }
          }

          completedChunks++;
          const progress = Math.round((completedChunks / totalChunks) * 100);

          if (progress >= lastReportedProgress + 10) {
            console.log(`progress: ${progress}%`);
            lastReportedProgress = progress;
          }

          resolve(primes);
        }, 0);
      })
    );
  }

  const results = await Promise.all(chunkPromises);
  const allPrimes = results.flat();

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

findPrimes(1, 700456, 500)
  .then(() => {
    console.log("Completed!");
  })
  .catch((err) => {
    console.log(`Error: ${err}`);
  });
