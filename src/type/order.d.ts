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
    status: statusType;
};

export type SalesmanAttributes = {
    id: number;
    createdAt: string;
    updatedAt: string;
    publishedAt: string;
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
    barang: BarangAttributes;
    createdAt: string;
    updatedAt: string;
    publishedAt: string;

};

export type OrderAttributes = {
    waktu_order: string;
    total_gross: number;
    createdAt: string;
    updatedAt: string;
    publishedAt: string;
    periode?: {
        data: {
            id: number;
            attributes: PeriodeAttributes;
        };
    } | number;
    outlet?: {
        data: {
            id: number;
            attributes: OutletAttributes;
        };
    } | number;
    salesman?: {
        data: {
            id: number;
            attributes: SalesmanAttributes;
        };
    } | number;
    status?: {
        data: {
            id: number;
            attributes: StatusAttributes;
        };
    } | number;
    detail_orders?: {
        data: DetailOrderAttributes[];
    };
};


type BarangAttributes = {
    data: {
        id: number;
        attributes: {
            nama: string;
            saldo_pack: number;
            saldo_pcs: number;
            pcs_per_pack: number;
            harga_pcs: number;
            harga_pack: number;
            createdAt: string;
            updatedAt: string;
            publishedAt: string;
        };
    };
};


export type OrderData = {
    id: number;
    attributes: OrderAttributes
};


export type HistoryOrderType = {
    id: number;
    attributes: {
        waktu_order: string;
        total_gross: number;
        createdAt: string;
        updatedAt: string;
        publishedAt: string;
        status: string;
        periode: {
            data: {
                id: number;
                attributes: PeriodeAttributes
            };
        }
        outlet: {
            data: {
                id: number;
                attributes: OutletAttributes
            };
        };
        salesman: {
            data: {
                id: number;
                attributes: SalesmanAttributes
            };
        };
        detail_orders: {
            data: [
                {
                    id: number;
                    attributes: DetailOrderAttributesss
                }
            ];
        };
    };
};


export type statusType = 'Toko Tutup' | 'Stop Cukup' | 'Beli Di Tempat Lain' | 'Bencana Alam' | 'Tidak DI Kunjungi' | 'Selesai';
