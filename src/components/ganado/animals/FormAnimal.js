import React, {Component} from 'react';
import {connect} from 'react-redux';
import { Form, Icon, Input, Button, DatePicker, Upload, InputNumber, Select, Switch} from 'antd';
import './detailAnimal.css';
import moment from 'moment';

const MonthPicker = DatePicker.MonthPicker;
const FormItem = Form.Item;
const {TextArea} = Input;
const Option = Select.Option;



const opciones = [{
    name :'becerro',
    id: 1
},{
    name:'toro',
    id:3
},{
    name:'vaca',
    id:4
},{
    name:'vaquilla',
    id:5
}

];

class FormAnimal extends Component {
    state={
        wEmpresa:true
    }
    handleSubmit = (e) => {
        e.preventDefault();
        this.props.form.validateFields((err, values) => {

            values['status']=true;
            if (!err) {
                if(!values.lote_id) delete values.lote_id;
                if(!values.raza_id) delete values.raza_id;
                if(!values.empresa_id) delete values.empresa_id;
                /*if(!values.lote_id) values['lote_id'] = null;
                if(!values.raza_id) values['raza_id'] = null;
                if(!values.empresa_id) values['empresa_id'] = null;*/
                if(!values.tipo_animal) delete values.tipo_animal;
               /* if(!values.costo_inicial) delete values.costo_inicial;
                if(!values.costo_kilo) delete values.costo_kilo;
                if(!values.peso_entrada) delete values.peso_entrada;*/

                console.log(values)
                this.props.saveAnimal(values);
                this.props.form.resetFields()
            }
            if (Array.isArray(e)) {
                return e;
            }
            return e && e.fileList;
        });
    };
    handleEmpresa=(e)=>{
      this.setState({wEmpresa:e})
    };

    normFile = (e) => {
        if (Array.isArray(e)) {
            return e;
        }
        return e && e.fileList;
    };

    render() {
        const { getFieldDecorator, getFieldValue } = this.props.form;
        let {wEmpresa} = this.state;
        let options = opciones.map((a) => <Option key={a.name}>{a.name}</Option>);
        let options_lote = this.props.lotes.map((a) => <Option value={parseInt(a.id)} key={a.id}>{a.name}</Option>);
        let options_raza= this.props.razas.map((a, key) => <Option value={parseInt(a.id)} key={key}>{a.name}</Option>);
        let options_empresa= this.props.empresas.map((a, key) => <Option value={parseInt(a.id)} key={key}>{a.company}</Option>);
        return (
            <div className={"formulario"} style={{backgroundColor: 'white'}}>
                <Form onSubmit={this.handleSubmit} style={{width:'100%'}}>
                    <div style={{display:'flex',flexDirection:'row', justifyContent:'space-around', flexWrap:'wrap' }}>

                        <FormItem
                            label="Arete Rancho"
                        >
                            {getFieldDecorator('arete_rancho', {

                                rules: [{
                                    required: true, message: 'Completa el campo!',
                                }],

                            })(
                                <Input />
                            )}
                        </FormItem>

                        <FormItem
                            label="Arete Siniga"
                        >
                            {getFieldDecorator('arete_siniga', {

                                rules: [{
                                    required: true, message: 'Completa el campo!',
                                }],
                            })(
                                <Input />
                            )}
                        </FormItem>

                        <FormItem
                            label="Fecha Registro"
                        >
                            {getFieldDecorator('fecha_entrada', {
                                initialValue:moment( new Date(), 'YYYY-MM-DD'),
                                rules: [{ type: 'object', required: false, message: 'Please select time!' }],
                            })(
                                <DatePicker />
                            )}
                        </FormItem>

                        <FormItem
                            label={"Tipo"}
                            style={{width:'150px'}}
                        >
                            {getFieldDecorator('tipo_animal', {

                                rules: [{

                                }],
                                props:{
                                    placeholder:'Selecciona un tipo',
                                }
                            })(


                                <Select  placeholder={"Selecciona un tipo"}>

                                    {options}
                                </Select>
                            )}

                        </FormItem>
                        <FormItem label={'A empresa?'}>
                            <Switch  defaultChecked={wEmpresa} onChange={this.handleEmpresa} checkedChildren="E" unCheckedChildren="P"/>
                        </FormItem>
                        {!wEmpresa?
                        <FormItem
                            label="Propietario"
                        >
                            {getFieldDecorator('owner', {
                                initialValue:null,
                                rules: [{

                                }],
                            })(
                                <Input style={{width:'200px'}}/>
                            )}
                        </FormItem>:
                        <FormItem
                            label="Empresa"
                        >
                            {getFieldDecorator('empresa_id', {

                            })(
                                <Select style={{width:'200px'}}>
                                    {options_empresa}
                                </Select>
                            )}
                        </FormItem>}

                        <FormItem
                            label="Factura Inicial"
                            style={{width:'200px'}}
                        >
                            {getFieldDecorator('ref_factura_original', {
                                initialValue:null,
                                rules: [{

                                }],
                            })(
                                <Input />
                            )}
                        </FormItem>

                        <FormItem
                            label="Peso Entrada (Kg)"
                            style={{width:'150px'}}
                        >
                            {getFieldDecorator('peso_entrada', {
                                initialValue:0,
                                rules: [{
                                    required:false
                                }],
                            })(
                                <InputNumber
                                    style={{width:'150px'}}
                                    step={0.01}
                                    min={0}
                                    max={1000}
                                    formatter={value => `${value}`}
                                    parser={value => value.replace('', '')}
                                />
                            )}
                        </FormItem>


                        <FormItem
                            label="Costo Kilo"
                            style={{width:'150px'}}
                        >
                            {getFieldDecorator('costo_kilo', {
                                initialValue:0,
                                rules: [{
                                    required:false
                                }],
                            })(
                                <InputNumber
                                    style={{width:'150px'}}
                                    step={0.01}
                                    formatter={value => `$ ${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
                                    parser={value => value.replace(/\$\s?|(,*)/g, '')}
                                />
                            )}
                        </FormItem>

                        <FormItem
                            label="Costo Inicial"
                            style={{width:'150px'}}
                        >
                            {getFieldDecorator('costo_inicial', {
                                initialValue:(getFieldValue('costo_kilo')*getFieldValue('peso_entrada')).toFixed(2),

                                rules: [{

                                }],
                            })(
                                <InputNumber
                                    style={{width:'150px'}}
                                    step={0.01}
                                    formatter={value => `$ ${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
                                    parser={value => value.replace(/\$\s?|(,*)/g, '')}
                                />
                            )}
                        </FormItem>

                        <FormItem
                            label="Merma (%)"
                            style={{width:'150px'}}
                        >
                            {getFieldDecorator('merma', {
                                initialValue:0,
                                rules: [{
                                    required:false
                                }],
                            })(
                                <InputNumber
                                    style={{width:'150px'}}
                                    step={0.01}
                                    formatter={value => `${value}%`}
                                    parser={value => value.replace('%', '')}
                                />
                            )}
                        </FormItem>

                        <FormItem
                            label="Raza"
                        >
                            {getFieldDecorator('raza_id', {

                            })(
                               <Select  style={{width:'150px'}}>
                                   {options_raza}
                               </Select>
                            )}
                        </FormItem>

                        <FormItem
                            label="Color"
                        >
                            {getFieldDecorator('color', {

                                rules: [{

                                }],
                            })(
                                <Input />
                            )}
                        </FormItem>

                        <FormItem
                            label={"Lote"}
                            style={{width:'30%'}}
                        >
                            {getFieldDecorator('lote_id', {
                                props:{
                                    placeholder:'Selecciona un Lote',
                                }
                            })(
                                <Select  placeholder={"Selecciona un Lote"}>
                                    {options_lote}
                                </Select>
                            )}
                        </FormItem>

                        <FormItem
                            label="Descripción"
                            style={{width:'30%'}}
                        >
                            {getFieldDecorator('descripcion', {

                            })(
                                <TextArea autosize />
                            )}
                        </FormItem>

                    </div>


                    <div style={{display:'flex',flexDirection:'row', justifyContent:'space-around', flexWrap:'wrap' }}>
                    <FormItem
                        label="Fierro Propietario"
                    >
                        <div className="dropbox">
                            {getFieldDecorator('fierro_original', {
                                valuePropName: 'fierroOriginal',
                                getValueFromEvent: this.normFile,
                            })(
                                <Upload.Dragger name="files" multiple={false}>
                                    <p className="ant-upload-drag-icon">
                                        <Icon type="inbox" />
                                    </p>

                                    <p className="ant-upload-hint">Click o arrastra una imagen</p>
                                </Upload.Dragger>
                            )}
                        </div>
                    </FormItem>
                    <FormItem
                        label="Fierro Nuevo"
                    >
                        <div className="dropbox">
                            {getFieldDecorator('fierro_nuevo', {
                                valuePropName: 'fierroNuevo',
                                getValueFromEvent: this.normFile,
                            })(
                                <Upload.Dragger name="files" multiple={false}>
                                    <p className="ant-upload-drag-icon">
                                        <Icon type="inbox" />
                                    </p>

                                    <p className="ant-upload-hint">Click o arrastra una imagen</p>
                                </Upload.Dragger>
                            )}
                        </div>
                    </FormItem>
                    </div>

                    <FormItem>
                        <Button type="primary" htmlType="submit" size="large" style={{display:'flex', justifyContent:'center', margin:'0 auto', width:'100%'}}>
                            Guardar
                        </Button>
                    </FormItem>
                </Form>
            </div>
        );
    }
}

const mapStateToProps = (state, ownProps) => ({
});

const mapDispatchToProps = () => ({

});



FormAnimal = connect(mapStateToProps, mapDispatchToProps)(FormAnimal);
const FormAnimals = Form.create()(FormAnimal);
export default FormAnimals;