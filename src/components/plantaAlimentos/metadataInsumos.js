import React from 'react';
import {Link} from "react-router-dom";

export const metadata = {
    columns: [
        {
            title: 'Nombre',
            dataIndex: 'name'
        },
        {
            title: 'Proveedor',
            dataIndex: 'provider',
            render: provider => provider && provider !== null ? provider.provider : 'Sin proveedor'
        },
        {
            title: 'Precio unitario',
            dataIndex: 'unit_price',
            render: unit_price => `$ ${unit_price}`
        },
        {
            title: 'Actions',
            dataIndex: 'id',
            fixed: 'right',
            width: 100,
            render: text => <Link to={`/admin/planta_alimentos/insumos/${text}`} >Editar</Link>,
        },
    ],
    rowSelection : {
        onChange: (selectedRowKeys, selectedRows) => {
            console.log(`selectedRowKeys: ${selectedRowKeys}`, 'selectedRows: ', selectedRows);
        }
    }
};