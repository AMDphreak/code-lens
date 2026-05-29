//! Seed view — pass serialized `CodeLensConfig` JSON.

use code_lens_adapter::{detach, mount_from_json};
use seed::{prelude::*, *};
use wasm_bindgen::JsValue;

pub struct CodeLensProps {
    pub config_json: String,
    pub class: String,
}

impl Default for CodeLensProps {
    fn default() -> Self {
        Self {
            config_json: String::new(),
            class: "code-lens-host".to_string(),
        }
    }
}

pub fn code_lens(props: &CodeLensProps) -> Node<Msg> {
    let config_json = props.config_json.clone();
    let class = props.class.clone();

    div![
        { class },
        after_mount(move |root| {
            if let Some(div) = root.dyn_ref::<web_sys::HtmlElement>() {
                if let Err(err) = mount_from_json(div, &config_json) {
                    web_sys::console::error_2(&JsValue::from_str("code-lens mount failed"), &err);
                }
            }
        }),
        before_unmount(move |root| {
            if let Some(div) = root.dyn_ref::<web_sys::HtmlElement>() {
                let _ = detach(div);
            }
        }),
    ]
}

enum Msg {}
