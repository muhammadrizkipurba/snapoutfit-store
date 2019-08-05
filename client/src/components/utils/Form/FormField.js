import React from 'react'

const FormField = ({formdata, change, name}) => {
    
    const renderTemplate = () => {
        let formTemplate = null;

        switch (formdata.element) {
            case("input"):  
                formTemplate = (
                    <input 
                        className="form-control mx-auto"
                        {...formdata.config}
                        value = {formdata.value}
                        onBlur = { (event) => change({event, name, blur: true}) }
                        onChange = { (event) => change({event, name})}
                        autoComplete="input"
                    />
                )
            break;
            
            case("product_input"):  
                formTemplate = (
                    <div className="formBlock">
                        {formdata.showlabel ?
                            <div className="label_inputs">
                                {formdata.config.label} 
                            </div> 
                            : null}
                        <span className="mr-2 mt-2">:</span> 
                        <input
                            className="form-control"
                            {...formdata.config}
                            value={formdata.value}
                            onBlur={(event) => change({ event, name, blur: true })}
                            onChange={(event) => change({ event, name })}
                            autoComplete="input"
                        />
                    </div>
                )
            break;

            case("site_input"):  
                formTemplate = (
                    <div className="formBlock">
                        {formdata.showlabel ?
                            <div className="label_inputs">
                                {formdata.config.label}
                            </div>
                            : null}
                        <span className="mr-2">:</span>                        
                        <input
                            className="form-control"
                            {...formdata.config}
                            value={formdata.value}
                            onBlur={(event) => change({ event, name, blur: true })}
                            onChange={(event) => change({ event, name })}
                            autoComplete="input"
                        />
                    </div>
                )
            break;
            
            case('textarea'):
                formTemplate = (
                    <div className="formBlock">
                        {formdata.showlabel ?
                            <div className="label_inputs">
                                {formdata.config.label}
                            </div>
                            : null}
                        <span className="mr-2 mt-2">:</span> 
                        <textarea
                            className="form-control"
                            {...formdata.config}
                            value={formdata.value}
                            onBlur={(event) => change({ event, name, blur: true })}
                            onChange={(event) => change({ event, name })}
                            autoComplete="input"
                        />
                    </div> 
                )                          
            break;
            
            case('select') :
                formTemplate = (
                    <div className="formBlock">
                        {formdata.showlabel ?
                            <div className="label_inputs">
                                {formdata.config.label}
                            </div>
                            : null}
                        <span className="mr-2 mt-2">:</span> 
                        <select
                            value={formdata.value}
                            onBlur={(event) => change({ event, name, blur: true })}
                            onChange={(event) => change({ event, name })}
                        >
                            <option value="" disabled>----</option>
                            {
                                formdata.config.options.map(item => (
                                    <option key={item.key} value={item.key}>
                                        {item.value}
                                    </option>
                                ))
                            }
                        </select>
                    </div> 
                )                  
            break;

            default : 
                formTemplate = null
        }

        return formTemplate;
    }
    
    return (
        <div>
            {renderTemplate()}
        </div>
    )
}

export default FormField ;
