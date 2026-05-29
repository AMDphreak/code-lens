//! Dominator view — pass serialized `CodeLensConfig` JSON.

use code_lens_adapter::{detach, mount_from_json};
use dominator::{events::OnMount, html, HtmlDivElement};
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

/// Mount `<code-lens>` inside a div. Append with `dominator::append_to_body` or your parent.
pub fn render(props: CodeLensProps) -> HtmlDivElement {
    let json = props.config_json;
    let class = props.class;

    html!("div", {
        .class(&class)
        .event(OnMount::new(move |host: HtmlDivElement| {
            if let Err(err) = mount_from_json(&host, &json) {
                web_sys::console::error_2(&JsValue::from_str("code-lens mount failed"), &err);
            }
            async move {
                let _ = detach(&host);
            }
        }))
    })
}
