# TypeScript Advanced Learning

Materi pembelajaran TypeScript untuk mahasiswa yang sudah memahami JavaScript dasar. Fokus pada konsep-konsep advanced seperti memory management, event loop, dan type system yang sophisticated.

## 🎯 Target Audience
Mahasiswa yang sudah paham:
- JavaScript fundamentals
- ES6+ features (async/await, destructuring, modules)
- Basic web development concepts

## 🚀 Setup Project

1. Install dependencies:
```bash
npm install
```

2. Run semua modul pembelajaran:
```bash
npm run dev
```

3. Compile TypeScript:
```bash
npm run build
```

4. Watch mode (auto-compile on changes):
```bash
npm run watch
```

## 📁 Struktur Pembelajaran

```
src/
├── 01-basic-typescript/          # Quick TypeScript review
│   └── type-system.ts           # Type annotations, inference, structural typing
├── 02-memory-management/         # Deep dive memory concepts
│   └── garbage-collection.ts    # GC, memory leaks, WeakMap/WeakSet
├── 03-event-loop/               # Async JavaScript internals
│   └── async-patterns.ts        # Event loop, call stack, micro/macro tasks
└── 04-advanced-types/           # Advanced TypeScript features
    └── generics-utility.ts      # Generics, utility types, conditional types
```

## 🧠 Konsep yang Dipelajari

### 1. Memory Management & Garbage Collection
- **Stack vs Heap**: Pemahaman alokasi memory
- **Mark & Sweep Algorithm**: Bagaimana GC bekerja
- **Memory Leaks**: Pattern yang harus dihindari
- **WeakMap/WeakSet**: Modern memory management
- **Memory Profiling**: Monitoring penggunaan memory

### 2. Event Loop & Asynchronous Patterns
- **Call Stack**: Execution context dan function calls
- **Event Loop**: Micro tasks vs Macro tasks priority
- **Promise Internals**: Custom Promise implementation
- **Async Patterns**: Promise chains vs async/await
- **Concurrent Execution**: Promise.all() dan error handling

### 3. Advanced TypeScript Types
- **Generics**: Type parameters dan constraints
- **Utility Types**: Partial, Pick, Omit, Record, dll
- **Conditional Types**: Type-level logic dengan extends
- **Mapped Types**: Transform object types
- **Template Literal Types**: String manipulation di type level
- **Discriminated Unions**: Type-safe state management

### 4. TypeScript untuk JavaScript Developers
- **Type Annotations vs Inference**: Kapan menggunakan masing-masing
- **Structural Typing**: Duck typing yang type-safe
- **Compile Time vs Runtime**: Error prevention
- **Advanced Function Types**: Overloads dan higher-order functions

## 🎓 Learning Path

1. **Start dengan `01-basic-typescript/`** - Quick review perbedaan TS vs JS
2. **Lanjut ke `02-memory-management/`** - Pahami bagaimana memory bekerja
3. **Masuk ke `03-event-loop/`** - Deep dive async JavaScript
4. **Finish dengan `04-advanced-types/`** - Master TypeScript type system

## 💡 Key Takeaways

- **Memory Management**: Understanding heap/stack, GC algorithms, leak prevention
- **Event Loop**: Micro vs macro tasks, concurrent patterns
- **Type Safety**: Compile-time error prevention, better refactoring
- **Developer Experience**: IntelliSense, autocomplete, self-documenting code

## 🛠️ Best Practices

1. **Memory**: Always cleanup timers, event listeners, dan resources
2. **Async**: Prefer async/await over Promise chains untuk readability
3. **Types**: Use utility types untuk code reusability
4. **Error Handling**: Implement Result pattern untuk type-safe errors

## 🔧 Development Tips

- Use `npm run watch` untuk development
- Check memory usage dengan `process.memoryUsage()`
- Analyze bundle size untuk production apps
- Enable strict mode di tsconfig.json

---

**Note**: Setiap folder memiliki console.log yang menjelaskan konsep. Jalankan `npm run dev` dan perhatikan output di terminal untuk pemahaman yang lebih baik.
