/**
 * 03 - Event Loop & Asynchronous Patterns
 * 
 * Deep dive ke Event Loop, Call Stack, dan Async patterns dengan TypeScript
 */

// ============================================================================
// 1. EVENT LOOP VISUALIZATION
// ============================================================================

console.log("🔄 Event Loop & Async Patterns");

function demonstrateEventLoop() {
    console.log("1. Synchronous - Call Stack");
    
    setTimeout(() => {
        console.log("4. setTimeout - Macro Task Queue");
    }, 0);
    
    Promise.resolve().then(() => {
        console.log("3. Promise - Micro Task Queue");
    });
    
    console.log("2. Synchronous - Call Stack");
    
    // Output order: 1 → 2 → 3 → 4
    // Micro tasks (Promises) have higher priority than macro tasks (setTimeout)
}

// ============================================================================
// 2. CALL STACK BEHAVIOR
// ============================================================================

function callStackDemo() {
    console.log("📚 Call Stack Demo");
    
    function first() {
        console.log("   → first() called");
        second();
        console.log("   → first() finished");
    }
    
    function second() {
        console.log("   → second() called");
        third();
        console.log("   → second() finished");
    }
    
    function third() {
        console.log("   → third() called");
        // Stack: main() → first() → second() → third()
        console.log("   → third() finished");
    }
    
    first();
}

// ============================================================================
// 3. ASYNC/AWAIT vs PROMISE CHAINS - TypeScript Types
// ============================================================================

// Type-safe API response
interface ApiResponse<T> {
    success: boolean;
    data: T;
    error?: string;
}

interface User {
    id: number;
    name: string;
    email: string;
}

// Simulate API call
function fetchUser(id: number): Promise<ApiResponse<User>> {
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve({
                success: true,
                data: {
                    id,
                    name: `User ${id}`,
                    email: `user${id}@example.com`
                }
            });
        }, 1000);
    });
}

// Promise chain approach
function promiseChainExample() {
    console.log("⛓️  Promise Chain Approach:");
    
    fetchUser(1)
        .then(response => {
            if (response.success) {
                console.log("   User fetched:", response.data.name);
                return fetchUser(2);
            }
            throw new Error(response.error || "Failed to fetch user 1");
        })
        .then(response => {
            if (response.success) {
                console.log("   Second user fetched:", response.data.name);
            }
        })
        .catch(error => {
            console.error("   Error:", error.message);
        });
}

// Async/await approach
async function asyncAwaitExample() {
    console.log("🎯 Async/Await Approach:");
    
    try {
        const user1Response = await fetchUser(1);
        if (user1Response.success) {
            console.log("   User fetched:", user1Response.data.name);
        }
        
        const user2Response = await fetchUser(2);
        if (user2Response.success) {
            console.log("   Second user fetched:", user2Response.data.name);
        }
    } catch (error) {
        console.error("   Error:", error);
    }
}

// ============================================================================
// 4. CONCURRENT EXECUTION PATTERNS
// ============================================================================

async function concurrentPatterns() {
    console.log("🚀 Concurrent Execution Patterns:");
    
    // Sequential execution (slow)
    console.log("   📈 Sequential:");
    const start1 = Date.now();
    await fetchUser(1);
    await fetchUser(2);
    console.log(`   Time: ${Date.now() - start1}ms`);
    
    // Concurrent execution (fast)
    console.log("   ⚡ Concurrent:");
    const start2 = Date.now();
    const [user1, user2] = await Promise.all([
        fetchUser(1),
        fetchUser(2)
    ]);
    console.log(`   Time: ${Date.now() - start2}ms`);
    console.log(`   Users: ${user1.data.name}, ${user2.data.name}`);
}

// ============================================================================
// 5. ERROR HANDLING PATTERNS
// ============================================================================

// Result pattern untuk error handling
type Result<T, E = Error> = 
    | { success: true; data: T }
    | { success: false; error: E };

async function safeApiCall<T>(
    apiCall: () => Promise<T>
): Promise<Result<T>> {
    try {
        const data = await apiCall();
        return { success: true, data };
    } catch (error) {
        return { 
            success: false, 
            error: error instanceof Error ? error : new Error(String(error))
        };
    }
}

async function errorHandlingDemo() {
    console.log("🛡️  Error Handling Patterns:");
    
    const result = await safeApiCall(() => fetchUser(999));
    
    if (result.success) {
        console.log("   Success:", result.data);
    } else {
        console.log("   Error:", result.error.message);
    }
}

// ============================================================================
// 6. CUSTOM PROMISE IMPLEMENTATION (Educational)
// ============================================================================

class SimplePromise<T> {
    private state: 'pending' | 'fulfilled' | 'rejected' = 'pending';
    private value?: T;
    private error?: any;
    private callbacks: Array<{
        onFulfilled?: (value: T) => any;
        onRejected?: (error: any) => any;
    }> = [];
    
    constructor(
        executor: (
            resolve: (value: T) => void,
            reject: (error: any) => void
        ) => void
    ) {
        try {
            executor(
                (value: T) => this.resolve(value),
                (error: any) => this.reject(error)
            );
        } catch (error) {
            this.reject(error);
        }
    }
    
    private resolve(value: T) {
        if (this.state === 'pending') {
            this.state = 'fulfilled';
            this.value = value;
            this.callbacks.forEach(({ onFulfilled }) => {
                onFulfilled?.(value);
            });
        }
    }
    
    private reject(error: any) {
        if (this.state === 'pending') {
            this.state = 'rejected';
            this.error = error;
            this.callbacks.forEach(({ onRejected }) => {
                onRejected?.(error);
            });
        }
    }
    
    then<U>(
        onFulfilled?: (value: T) => U,
        onRejected?: (error: any) => U
    ): SimplePromise<U> {
        return new SimplePromise<U>((resolve, reject) => {
            if (this.state === 'fulfilled') {
                try {
                    const result = onFulfilled?.(this.value!);
                    resolve(result as U);
                } catch (error) {
                    reject(error);
                }
            } else if (this.state === 'rejected') {
                try {
                    const result = onRejected?.(this.error);
                    resolve(result as U);
                } catch (error) {
                    reject(error);
                }
            } else {
                this.callbacks.push({
                    onFulfilled: (value) => {
                        try {
                            const result = onFulfilled?.(value);
                            resolve(result as U);
                        } catch (error) {
                            reject(error);
                        }
                    },
                    onRejected: (error) => {
                        try {
                            const result = onRejected?.(error);
                            resolve(result as U);
                        } catch (error) {
                            reject(error);
                        }
                    }
                });
            }
        });
    }
}

// Demo simple promise
function simplePromiseDemo() {
    console.log("🔧 Custom Promise Implementation:");
    
    const simplePromise = new SimplePromise<string>((resolve) => {
        setTimeout(() => resolve("Hello from SimplePromise!"), 500);
    });
    
    simplePromise.then(value => {
        console.log("   ", value);
    });
}

// ============================================================================
// EXECUTION
// ============================================================================

setTimeout(() => {
    demonstrateEventLoop();
}, 100);

setTimeout(() => {
    callStackDemo();
    promiseChainExample();
}, 500);

setTimeout(() => {
    asyncAwaitExample();
}, 1500);

setTimeout(() => {
    concurrentPatterns();
}, 3000);

setTimeout(() => {
    errorHandlingDemo();
}, 5500);

setTimeout(() => {
    simplePromiseDemo();
}, 6000);

// ============================================================================
// KEY TAKEAWAYS
// ============================================================================
setTimeout(() => {
    console.log(`
🎓 Key Takeaways - Event Loop & Async:

1. Event Loop Order:
   Call Stack → Micro Tasks (Promises) → Macro Tasks (setTimeout)

2. Async Patterns:
   - Promise chains: Good for simple cases
   - Async/await: Better readability, easier error handling
   - Promise.all(): Concurrent execution

3. Error Handling:
   - Result pattern untuk type-safe errors
   - Always handle rejections
   - Use try-catch dengan async/await

4. Performance:
   - Concurrent > Sequential
   - Micro tasks memiliki prioritas lebih tinggi
   - Jangan blocking event loop
`);
}, 7000);

export { 
    ApiResponse, 
    User, 
    fetchUser, 
    safeApiCall, 
    SimplePromise,
    Result
};
