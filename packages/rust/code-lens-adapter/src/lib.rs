//! Mount [`code-lens`](https://github.com/AMDphreak/code-lens) from Rust/WASM web apps.
//!
//! Bundle `@code-lens/wasm-bridge` in your frontend (Trunk, Vite, Leptos CSR) and call
//! [`mount_from_json`] when a host `<div>` is ready.

use js_sys::{Function, JsValue, Reflect};
use wasm_bindgen::prelude::*;

fn bridge() -> Result<JsValue, JsValue> {
    let window = web_sys::window().ok_or_else(|| JsValue::from_str("no window"))?;
    Reflect::get(&window, &JsValue::from_str("__codeLensBridge"))
        .map_err(|_| JsValue::from_str("@code-lens/wasm-bridge not loaded — import it in your JS entry"))
}

/// Attach `<code-lens>` inside `host` using JSON-serialized `CodeLensConfig`.
pub fn mount_from_json(host: &web_sys::HtmlElement, config_json: &str) -> Result<JsValue, JsValue> {
    let attach = Reflect::get(&bridge()?, &JsValue::from_str("attachCodeLensFromJson"))?;
    let attach = attach.dyn_into::<Function>()?;
    attach.call2(&JsValue::NULL, host, &JsValue::from_str(config_json))
}

/// Remove children from the host (detach lens).
pub fn detach(host: &web_sys::HtmlElement) -> Result<(), JsValue> {
    let detach = Reflect::get(&bridge()?, &JsValue::from_str("detachCodeLens"))?;
    let detach = detach.dyn_into::<Function>()?;
    detach.call1(&JsValue::NULL, host)?;
    Ok(())
}
