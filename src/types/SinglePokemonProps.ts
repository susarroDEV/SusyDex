export type Ability = {
    ability: {
        name: string;
    };
}

export type Move = {
    version_group_details: {
        level_learned_at: number;
    }[];
    move: {
        name: string;
        type: {
            name: string;
        };
        damage_class: {
            name: string;
        };
        power: number;
        accuracy: number;
        pp: number;
    };
}