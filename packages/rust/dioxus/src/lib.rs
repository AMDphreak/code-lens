use code_lens_adapter::{detach, mount_from_json};
use dioxus::prelude::*;
use wasm_bindgen::JsValue;

#[component]
pub fn CodeLens(
    config_json: String,
    #[props(default = String::from("code-lens-host"))] class: String,
) -> Element {
    let config = use_memo(move || config_json.clone());
    let mut host = use_node_ref();

    use_effect(move || {
        let json = config();
        if let Some(div) = host.read().cast::<web_sys::HtmlElement>() {
            if let Err(err) = mount_from_json(&div, &json) {
                web_sys::console::error_2(&JsValue::from_str("code-lens mount failed"), &err);
            }
        }
    });

    use_drop(move || {
        if let Some(div) = host.read().cast::<web_sys::HtmlElement>() {
            let _ = detach(&div);
        }
    });

    rsx! {
        div { class: "{class}", node_ref: host }
    }
}
