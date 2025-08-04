/**
 * 04 - Advanced TypeScript Types & Utility Types
 * 
 * Advanced type system features yang membuat TypeScript powerful
 */

console.log("🔥 Advanced TypeScript Types");

// ============================================================================
// 1. GENERICS - Type Parameters
// ============================================================================

// Generic function
function identity<T>(arg: T): T {
    return arg;
}

// Usage dengan type inference
const stringResult = identity("hello");    // string
const numberResult = identity(42);         // number

// Generic interface
interface Repository<T> {
    create(item: T): Promise<T>;
    findById(id: string): Promise<T | null>;
    update(id: string, updates: Partial<T>): Promise<T>;
    delete(id: string): Promise<boolean>;
}

// Implementation
class UserRepository implements Repository<User> {
    private users: Map<string, User> = new Map();
    
    async create(user: User): Promise<User> {
        this.users.set(user.id, user);
        return user;
    }
    
    async findById(id: string): Promise<User | null> {
        return this.users.get(id) || null;
    }
    
    async update(id: string, updates: Partial<User>): Promise<User> {
        const existing = this.users.get(id);
        if (!existing) throw new Error("User not found");
        
        const updated = { ...existing, ...updates };
        this.users.set(id, updated);
        return updated;
    }
    
    async delete(id: string): Promise<boolean> {
        return this.users.delete(id);
    }
}

interface User {
    id: string;
    name: string;
    email: string;
    age: number;
}

// ============================================================================
// 2. UTILITY TYPES - Built-in Type Transformations
// ============================================================================

// Partial<T> - Semua properties jadi optional
type UserUpdate = Partial<User>;
// type UserUpdate = {
//     id?: string;
//     name?: string;
//     email?: string;
//     age?: number;
// }

// Required<T> - Semua properties jadi required
interface OptionalUser {
    id?: string;
    name?: string;
    email?: string;
}
type RequiredUser = Required<OptionalUser>;

// Pick<T, K> - Ambil properties tertentu
type UserSummary = Pick<User, 'id' | 'name'>;
// type UserSummary = {
//     id: string;
//     name: string;
// }

// Omit<T, K> - Exclude properties tertentu
type UserWithoutId = Omit<User, 'id'>;
// type UserWithoutId = {
//     name: string;
//     email: string;
//     age: number;
// }

// Record<K, T> - Create object type dengan keys K dan values T
type UserRoles = Record<string, 'admin' | 'user' | 'guest'>;
const roles: UserRoles = {
    'user1': 'admin',
    'user2': 'user',
    'user3': 'guest'
};

// ============================================================================
// 3. CONDITIONAL TYPES - Type-level if statements
// ============================================================================

// Basic conditional type
type IsString<T> = T extends string ? true : false;

type Test1 = IsString<string>;  // true
type Test2 = IsString<number>;  // false

// Practical example: Extract array element type
type ArrayElement<T> = T extends (infer U)[] ? U : never;

type StringArrayElement = ArrayElement<string[]>;  // string
type NumberArrayElement = ArrayElement<number[]>;  // number

// Advanced: Function parameter extraction
type Parameters<T extends (...args: any[]) => any> = T extends (...args: infer P) => any ? P : never;
type ReturnType<T extends (...args: any[]) => any> = T extends (...args: any[]) => infer R ? R : any;

function exampleFunction(a: string, b: number): boolean {
    return a.length > b;
}

type ExampleParams = Parameters<typeof exampleFunction>;  // [string, number]
type ExampleReturn = ReturnType<typeof exampleFunction>;  // boolean

// ============================================================================
// 4. MAPPED TYPES - Transform object types
// ============================================================================

// Make all properties readonly
type Readonly<T> = {
    readonly [P in keyof T]: T[P];
};

type ReadonlyUser = Readonly<User>;

// Make all properties optional
type Optional<T> = {
    [P in keyof T]?: T[P];
};

// Add prefix to all property names
type Prefixed<T, Prefix extends string> = {
    [P in keyof T as `${Prefix}${string & P}`]: T[P];
};

type PrefixedUser = Prefixed<User, "user_">;
// type PrefixedUser = {
//     user_id: string;
//     user_name: string;
//     user_email: string;
//     user_age: number;
// }

// ============================================================================
// 5. TEMPLATE LITERAL TYPES - String manipulation at type level
// ============================================================================

// Create API endpoints from entity names
type HttpMethod = 'GET' | 'POST' | 'PUT' | 'DELETE';
type Entity = 'user' | 'post' | 'comment';

type ApiEndpoint<Method extends HttpMethod, EntityName extends Entity> = 
    `${Lowercase<Method>} /${EntityName}`;

type UserEndpoints = ApiEndpoint<'GET', 'user'>;     // "get /user"
type PostEndpoints = ApiEndpoint<'POST', 'post'>;    // "post /post"

// Event name patterns
type EventName<T extends string> = `on${Capitalize<T>}`;

type ClickEvent = EventName<'click'>;        // "onClick"
type ChangeEvent = EventName<'change'>;      // "onChange"

// ============================================================================
// 6. DISCRIMINATED UNIONS - Type-safe state management
// ============================================================================

// Loading states
type LoadingState = 
    | { status: 'idle' }
    | { status: 'loading' }
    | { status: 'success'; data: User[] }
    | { status: 'error'; error: string };

function handleLoadingState(state: LoadingState) {
    switch (state.status) {
        case 'idle':
            console.log("Not started yet");
            break;
        case 'loading':
            console.log("Loading...");
            break;
        case 'success':
            console.log("Data loaded:", state.data.length, "users");
            // TypeScript knows state.data exists here
            break;
        case 'error':
            console.log("Error:", state.error);
            // TypeScript knows state.error exists here
            break;
    }
}

// ============================================================================
// 7. ADVANCED FUNCTION TYPES
// ============================================================================

// Function overloads
function process(input: string): string;
function process(input: number): number;
function process(input: boolean): boolean;
function process(input: string | number | boolean): string | number | boolean {
    if (typeof input === 'string') {
        return input.toUpperCase();
    } else if (typeof input === 'number') {
        return input * 2;
    } else {
        return !input;
    }
}

// Higher-order function types
type Middleware<T> = (input: T) => (next: (input: T) => T) => T;

const logMiddleware: Middleware<string> = (input) => (next) => {
    console.log("Before:", input);
    const result = next(input);
    console.log("After:", result);
    return result;
};

// ============================================================================
// 8. PRACTICAL EXAMPLE - Type-safe Event Emitter
// ============================================================================

interface EventMap {
    'user:created': { user: User };
    'user:updated': { user: User; changes: Partial<User> };
    'user:deleted': { userId: string };
}

class TypedEventEmitter<T extends Record<string, any>> {
    private listeners: {
        [K in keyof T]?: Array<(data: T[K]) => void>;
    } = {};
    
    on<K extends keyof T>(event: K, listener: (data: T[K]) => void): void {
        if (!this.listeners[event]) {
            this.listeners[event] = [];
        }
        this.listeners[event]!.push(listener);
    }
    
    emit<K extends keyof T>(event: K, data: T[K]): void {
        const eventListeners = this.listeners[event];
        if (eventListeners) {
            eventListeners.forEach(listener => listener(data));
        }
    }
    
    off<K extends keyof T>(event: K, listener: (data: T[K]) => void): void {
        const eventListeners = this.listeners[event];
        if (eventListeners) {
            const index = eventListeners.indexOf(listener);
            if (index > -1) {
                eventListeners.splice(index, 1);
            }
        }
    }
}

// Usage
const emitter = new TypedEventEmitter<EventMap>();

emitter.on('user:created', ({ user }) => {
    console.log(`User created: ${user.name}`);
});

emitter.on('user:updated', ({ user, changes }) => {
    console.log(`User ${user.name} updated:`, changes);
});

// Type-safe emit
emitter.emit('user:created', {
    user: { id: '1', name: 'John', email: 'john@example.com', age: 25 }
});

// ============================================================================
// DEMO EXECUTION
// ============================================================================

console.log("🚀 Running Advanced Types Demo...");

const userRepo = new UserRepository();
const testUser: User = {
    id: '1',
    name: 'John Doe',
    email: 'john@example.com',
    age: 25
};

// Demo repository
(async () => {
    await userRepo.create(testUser);
    const found = await userRepo.findById('1');
    console.log("Found user:", found);
    
    await userRepo.update('1', { age: 26 });
    console.log("User updated");
})();

// Demo function overloads
console.log("String process:", process("hello"));
console.log("Number process:", process(5));
console.log("Boolean process:", process(true));

// Demo loading state
const loadingStates: LoadingState[] = [
    { status: 'idle' },
    { status: 'loading' },
    { status: 'success', data: [testUser] },
    { status: 'error', error: 'Network error' }
];

loadingStates.forEach(handleLoadingState);

// ============================================================================
// KEY TAKEAWAYS
// ============================================================================
console.log(`
🎓 Key Takeaways - Advanced TypeScript:

1. Generics:
   - Type parameters untuk reusable code
   - Constraints dengan extends
   - Inference untuk better DX

2. Utility Types:
   - Partial, Required, Pick, Omit
   - Record untuk dynamic objects
   - ReturnType, Parameters untuk functions

3. Advanced Features:
   - Conditional types untuk type-level logic
   - Mapped types untuk transformations
   - Template literals untuk string manipulation

4. Practical Patterns:
   - Discriminated unions untuk state management
   - Function overloads untuk API flexibility
   - Type-safe event systems

5. Benefits:
   - Catch errors at compile time
   - Better IntelliSense/autocomplete
   - Self-documenting code
   - Refactoring safety
`);

export { 
    Repository, 
    UserRepository, 
    User, 
    LoadingState,
    TypedEventEmitter,
    EventMap,
    ApiEndpoint,
    Prefixed
};
