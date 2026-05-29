//! Sycamore component — pass serialized `CodeLensConfig` JSON.

use code_lens_adapter::{detach, mount_from_json};
use sycamore::prelude::*;
use wasm_bindgen::JsValue;

#[derive(Prop)]
pub struct CodeLensProps {
    pub config_json: String,
    #[prop(default = "code-lens-host".into(), into)]
    pub class: String,
}

#[component]
pub fn CodeLens(props: CodeLensProps) -> View {
    let host = NodeRef::new();
    let config_json = create_memo(move || props.config_json.clone());

    create_effect(move || {
        if let Some(div) = host.try_get() {
            let json = config_json.get();
            if let Err(err) = mount_from_json(div, &json) {
                web_sys::console::error_2(&JsValue::from_str("code-lens mount failed"), &err);
            }
        }
    });

    on_cleanup(move || {
        if let Some(div) = host.try_get() {
            let _ = detach(div);
        }
    });

    view! {
        div(class=&props.class, bind:ref=host) {}
    }
}
