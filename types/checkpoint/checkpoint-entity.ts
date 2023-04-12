export interface NewCheckpointEntity extends Omit<CheckpointEntity, 'id'> {
    id?: string;
}

export interface SimpleCheckpointEntity {
    id: string;
    name: string;
}

export interface CheckpointEntity extends SimpleCheckpointEntity {
    address: string;
    lat: number;
    lon: number;
}