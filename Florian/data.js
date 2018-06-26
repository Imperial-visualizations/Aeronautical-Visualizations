    $(function() { // Function to switch between tabs
        $('ul.tab-nav li a.button').click(function() {
            var href = $(this).attr('href');
            $('li a.active.button', $(this).parent().parent()).removeClass('active');
            $(this).addClass('active');
            $('.tab-pane.active', $(href).parent()).removeClass('active');
            $(href).addClass('active');

            //initPolar(href);
            //return false;
        });
    });
// $(document).ready(main);