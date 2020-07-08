function apicall(url, callback) {
    $.getJSON(url, callback);
}

// If someone finds a way to do this in CSS, please open a issue/PR
function fix_code_blocks() {
    document.querySelectorAll("code").forEach(el =>
        el.textContent = el.textContent.replace(/^\n/,'')
    );
}

function navbar_prov_status(msg) {
    document.getElementById("navbar-prov-status").innerHTML = msg;
}

function update_ansible_status_call() {
    apicall("/api/ansible", function(ret) {

        Object.keys(ret.data.stats).forEach(function(container) {
            const {
                changed,
                failures,
                ok,
                skipped,
                unreachable
            } = ret.data.stats[container];

            if (failures) {
                navbar_prov_status(container + " failed, see Status.");
            }
        });

        if (ret.running) {
            navbar_prov_status("Applying configuration");
        }

    });
}
