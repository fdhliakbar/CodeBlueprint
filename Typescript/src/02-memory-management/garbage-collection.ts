/**
 * 02 - Memory Management & Garbage Collection
 * 
 * Pemahaman mendalam tentang bagaimana V8 engine mengelola memory
 */

// ============================================================================
// 1. MEMORY ALLOCATION - Heap vs Stack
// ============================================================================

console.log("🧠 Memory Management Concepts");

// Stack: Primitive values, function calls
function stackExample() {
    let a = 10;        // Stack
    let b = "hello";   // Stack (small strings)
    let c = true;      // Stack
    
    console.log("Stack values:", { a, b, c });
}

// Heap: Objects, arrays, functions
function heapExample() {
    let obj = { name: "John", age: 25 };  // Heap
    let arr = [1, 2, 3, 4, 5];            // Heap
    let func = () => console.log("Hi");   // Heap
    
    console.log("Heap references stored in stack");
}

// ============================================================================
// 2. GARBAGE COLLECTION - Mark & Sweep Algorithm
// ============================================================================

class GCDemo {
    private data: number[];
    
    constructor(size: number) {
        this.data = new Array(size).fill(0).map((_, i) => i);
        console.log(`📦 Allocated array of ${size} elements`);
    }
    
    // Method untuk demonstrasi reference counting
    createCircularReference() {
        const obj1: any = { name: "Object 1" };
        const obj2: any = { name: "Object 2" };
        
        // Circular reference - modern GC dapat menangani ini
        obj1.ref = obj2;
        obj2.ref = obj1;
        
        console.log("🔄 Created circular reference");
        return { obj1, obj2 };
    }
}

// ============================================================================
// 3. MEMORY LEAKS - Common Patterns
// ============================================================================

class MemoryLeakExamples {
    private timer?: NodeJS.Timeout;
    private eventHandlers: Array<() => void> = [];
    
    // ❌ Potential memory leak: Timer tidak di-clear
    startLeakyTimer() {
        this.timer = setInterval(() => {
            console.log("Timer running...");
        }, 1000);
    }
    
    // ✅ Proper cleanup
    stopTimer() {
        if (this.timer) {
            clearInterval(this.timer);
            this.timer = undefined;
            console.log("🧹 Timer cleaned up");
        }
    }
    
    // ❌ Potential memory leak: Event listeners tidak di-remove
    addEventHandler(handler: () => void) {
        this.eventHandlers.push(handler);
        // Bayangkan ini addEventListener di browser
    }
    
    // ✅ Proper cleanup
    cleanup() {
        this.eventHandlers = [];
        this.stopTimer();
        console.log("🧹 All resources cleaned up");
    }
}

// ============================================================================
// 4. WEAK REFERENCES - Modern Memory Management
// ============================================================================

// WeakMap: Keys dapat di-garbage collect
const objectMetadata = new WeakMap();

class ObjectWithMetadata {
    constructor(public id: string) {
        // Metadata tidak mencegah object dari GC
        objectMetadata.set(this, { 
            createdAt: new Date(),
            accessCount: 0 
        });
    }
    
    getMetadata() {
        const metadata = objectMetadata.get(this);
        if (metadata) {
            metadata.accessCount++;
        }
        return metadata;
    }
}

// ============================================================================
// 5. MEMORY PROFILING - Monitoring Usage
// ============================================================================

function measureMemoryUsage() {
    if (typeof process !== 'undefined' && process.memoryUsage) {
        const usage = process.memoryUsage();
        console.log("📊 Memory Usage:");
        console.log(`   RSS: ${Math.round(usage.rss / 1024 / 1024)} MB`);
        console.log(`   Heap Used: ${Math.round(usage.heapUsed / 1024 / 1024)} MB`);
        console.log(`   Heap Total: ${Math.round(usage.heapTotal / 1024 / 1024)} MB`);
        console.log(`   External: ${Math.round(usage.external / 1024 / 1024)} MB`);
    }
}

// Demo execution
stackExample();
heapExample();

const gcDemo = new GCDemo(1000);
const { obj1, obj2 } = gcDemo.createCircularReference();

const leakDemo = new MemoryLeakExamples();
leakDemo.startLeakyTimer();

// Cleanup after 3 seconds
setTimeout(() => {
    leakDemo.cleanup();
    measureMemoryUsage();
}, 3000);

const objWithMeta = new ObjectWithMetadata("test-123");
console.log("Object metadata:", objWithMeta.getMetadata());

// ============================================================================
// KEY TAKEAWAYS untuk mahasiswa:
// ============================================================================
console.log(`
🎓 Key Takeaways - Memory Management:

1. Stack vs Heap:
   - Primitives → Stack
   - Objects/Arrays → Heap

2. Garbage Collection:
   - Mark & Sweep algorithm
   - Automatic, tapi tetap perlu hati-hati

3. Common Memory Leaks:
   - Uncleaned timers/intervals
   - Event listeners tidak di-remove
   - Circular references (jarang di modern engines)

4. Best Practices:
   - Always cleanup resources
   - Use WeakMap/WeakSet untuk caching
   - Monitor memory usage di production
`);

export { GCDemo, MemoryLeakExamples, ObjectWithMetadata, measureMemoryUsage };
