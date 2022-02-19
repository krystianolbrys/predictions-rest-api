export interface IDbContext<T> {
  insert(model: T): void;
  fetchAll(): Array<T>;
  fetchOne(id: number): T;
  update(id: number, updatedModel: T): void;
  delete(id: number): void;
}
