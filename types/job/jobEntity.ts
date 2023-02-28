export interface NewJobEntity extends Omit<JobEntity, 'id' | 'number' | 'cp_a_code' | 'cp_b_code' | 'cp_c_code'> {
    id?: string;
    number?: number
    cp_a_code?: number;
    cp_b_code?: number;
    cp_c_code?: number;
}

export interface SimpleJobEntity {
    number: number;
    cp_a_name: string;
    cp_b_name: string;
    cp_c_name: string | null;
}

export interface JobEntity extends SimpleJobEntity {
    id: string;
    cp_a_code: number;
    cp_b_code: number;
    cp_c_code: number | null;
    points: number;
}