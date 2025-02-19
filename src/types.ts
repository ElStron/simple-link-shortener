export type Env = {
    Bindings: Bindings
}

export type Bindings = {
    kv: KVNamespace
    DB: D1Database
    database_id: string
    database_name: string
}