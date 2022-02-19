export interface IDbContext<T> {
  insert(model: T): void;
  fetchAll(): Array<T>;
  fetchOne(id: number): T;
  updateStatus(id: number, updatedModel: T): void;
}
