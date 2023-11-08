export type PeriodeAttributes = {
    id: number;
    nama: string;
    tanggal_mulai: string;
    tanggal_akhir: string;
    status: string;
    createdAt: string;
    updatedAt: string;
    publishedAt: string;
};

export type OutletAttributes = {
    id: number;
    nama: string;
    type: string;
    alamat: string;
    kecamatan: string;
    kelurahan: string;
    target: string;
    createdAt: string;
    updatedAt: string;
    publishedAt: string;
    status: string;
};

export type SalesmanAttributes = {
    id: number;
    createdAt: string;
    updatedAt: string;
    publishedAt: string;
    omset: number;
    target_outlet: number;
    aktual_outlet: number;
    outlets?: OutletAttributes[],
    periode?: PeriodeAttributes
};

export type StatusAttributes = {
    id: number;
    nama: string;
    createdAt: string;
    updatedAt: string;
    publishedAt: string;
};

export type DetailOrderAttributes = {
    id: number;
    jumlah_pcs: number;
    jumlah_pack: number;
    gross: number;
    createdAt: string;
    updatedAt: string;
    publishedAt: string;
};

export type OrderData = {
    id: number;
    attributes: {
        waktu_order: string;
        total_gross: number;
        createdAt: string;
        updatedAt: string;
        publishedAt: string;
        periode: {
            data: {
                id: number;
                attributes: PeriodeAttributes;
            };
        };
        outlet: {
            data: {
                id: number;
                attributes: OutletAttributes;
            };
        };
        salesman: {
            data: {
                id: number;
                attributes: SalesmanAttributes;
            };
        };
        status: {
            data: {
                id: number;
                attributes: StatusAttributes;
            };
        };
        detail_orders: {
            data: DetailOrderAttributes[];
        };
    };
};