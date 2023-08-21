import { FieldValue, Timestamp } from "@angular/fire/firestore";

export interface Pedido {
    name: string;
    date: FieldValue | Timestamp;
}