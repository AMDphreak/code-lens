use code_lens_adapter::{detach, mount_from_json};
use wasm_bindgen::JsValue;
use yew::prelude::*;

#[derive(Properties, PartialEq, Clone)]
pub struct CodeLensProps {
    pub config_json: String,
    #[prop_or("code-lens-host".into())]
    pub class: AttrValue,
}

#[function_component(CodeLens)]
pub fn code_lens(props: &CodeLensProps) -> Html {
    let host_ref = NodeRef::default();
    let config = props.config_json.clone();

    {
        let host_ref = host_ref.clone();
        use_effect_with(config, move |json| {
            if let Some(div) = host_ref.cast::<web_sys::HtmlElement>() {
                if let Err(err) = mount_from_json(&div, json) {
                    web_sys::console::error_2(&JsValue::from_str("code-lens mount failed"), &err);
                }
            }
            move || {
                if let Some(div) = host_ref.cast::<web_sys::HtmlElement>() {
                    let _ = detach(&div);
                }
            }
        });
    }

    html! {
        <div ref={host_ref} class={props.class.clone()} />
    }
}
