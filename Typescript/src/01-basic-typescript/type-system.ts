/**
 * 01 - Basic TypeScript: Konsep Dasar untuk JavaScript Developers
 * 
 * Karena kalian sudah paham JS, ini hanya review singkat perbedaan utama TS
 */

// ============================================================================
// 1. TYPE ANNOTATIONS - Perbedaan utama dari JS
// ============================================================================

// JS: let user = { name: "John", age: 25 };
// TS: Explicit typing untuk mencegah runtime errors
interface User {
    name: string;
    age: number;
    email?: string; // Optional property
}

const user: User = {
    name: "John",
    age: 25
};

// ============================================================================
// 2. COMPILE TIME vs RUNTIME
// ============================================================================

// TypeScript = Static typing at compile time
// JavaScript = Dynamic typing at runtime

function calculateTotal(price: number, tax: number): number {
    return price + (price * tax);
}

// Error at compile time (bukan runtime seperti JS)
// calculateTotal("100", "0.1"); // ❌ Type error

console.log("💡 TypeScript menangkap error sebelum runtime!");

// ============================================================================
// 3. TYPE INFERENCE - TS bisa menebak tipe
// ============================================================================

let message = "Hello"; // TS tahu ini string
let count = 42;        // TS tahu ini number

// message = 123; // ❌ Error: Type 'number' is not assignable to type 'string'

// ============================================================================
// 4. UNION TYPES - Fleksibilitas dengan safety
// ============================================================================

type Status = "loading" | "success" | "error";

function handleStatus(status: Status) {
    switch (status) {
        case "loading":
            console.log("⏳ Loading...");
            break;
        case "success":
            console.log("✅ Success!");
            break;
        case "error":
            console.log("❌ Error occurred");
            break;
        // TS akan warning jika ada case yang tidak ditangani
    }
}

// ============================================================================
// 5. STRUCTURAL TYPING - Duck Typing yang Safe
// ============================================================================

interface Point {
    x: number;
    y: number;
}

function printPoint(point: Point) {
    console.log(`Point: (${point.x}, ${point.y})`);
}

// Object literal harus exact match
printPoint({ x: 10, y: 20 });

// Variable bisa memiliki properties tambahan
const complexPoint = { x: 10, y: 20, z: 30, color: "red" };
printPoint(complexPoint); // ✅ Valid karena memiliki x dan y

console.log("🎯 Structural typing memungkinkan fleksibilitas dengan type safety");

export { User, Status, Point };
