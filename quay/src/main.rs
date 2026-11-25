fn main() {
    match quay::export_command(std::env::args().skip(1)) {
        Ok(body) => {
            println!("{body}");
        }
        Err(err) => {
            eprintln!("{err}");
            std::process::exit(2);
        }
    }
}
