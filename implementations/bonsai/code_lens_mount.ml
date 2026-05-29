(* Jane Street Bonsai_web — embed @code-lens/vanilla via js_of_ocaml.
   Load @code-lens/wasm-bridge in index.html before main.bc.js. *)

open Js_of_ocaml

module Bridge = struct
  let window () = Dom_html.window

  let bridge () =
    let w = window () in
    match Js.Unsafe.get w (Js.string "__codeLensBridge") with
    | bridge when Js.Optdef.test bridge -> Js.Unsafe.coerce bridge
    | _ ->
        failwith
          "Import @code-lens/wasm-bridge in index.html before main.bc.js"

  let attach_from_json (host : Dom_html.element Js.t) (config_json : string) : unit =
    let open Js in
    let bridge = bridge () in
    let attach =
      Optdef.get (Unoptdef.get (bridge##. attachCodeLensFromJson))
        (fun () -> failwith "attachCodeLensFromJson missing on __codeLensBridge")
    in
    ignore (attach##call host (string config_json))

  let detach (host : Dom_html.element Js.t) : unit =
    let open Js in
    let bridge = bridge () in
    let detach_fn =
      Optdef.get (Unoptdef.get (bridge##. detachCodeLens))
        (fun () -> failwith "detachCodeLens missing on __codeLensBridge")
    in
    ignore (detach_fn##call host)
end

(** Attach `<code-lens>` when a Bonsai-managed DOM node is live. *)
let mount ~host ~config_json = Bridge.attach_from_json host config_json

let unmount ~host = Bridge.detach host

(* Suggested host div attrs in bonsai_web Virtual_dom:
   [ Attr.class_ "code-lens-host"; Attr.create "data-code-lens-host" "true" ]
*)
