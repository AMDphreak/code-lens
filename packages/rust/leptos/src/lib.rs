//! Leptos component — pass serialized `CodeLensConfig` JSON from your app.

use code_lens_adapter::{detach, mount_from_json};
use leptos::prelude::*;
use wasm_bindgen::JsValue;

#[component]
pub fn CodeLens(
    /// JSON string matching `CodeLensConfig`.
    config_json: String,
    #[prop(optional, into)] class: String,
) -> impl IntoView {
    let host = NodeRef::<leptos::html::Div>::new();

    Effect::new({
        let config_json = config_json.clone();
        move |_| {
            if let Some(div) = host.get() {
                if let Err(err) = mount_from_json(&div, &config_json) {
                    web_sys::console::error_2(&JsValue::from_str("code-lens mount failed"), &err);
                }
            }
        }
    });

    on_cleanup({
        let host = host.clone();
        move || {
            if let Some(div) = host.get() {
                let _ = detach(&div);
            }
        }
    });

    let class = if class.is_empty() {
        "code-lens-host".to_string()
    } else {
        class
    };

    view! {
        <div class=class node_ref=host></div>
    }
}
