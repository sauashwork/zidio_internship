package com.zidio.zidioBackend.entity;

public class Sender {
    public static String output = "";

    public static synchronized void appendOutput(String text) {
        output += text;
    }

    public static String getOutput() {
        return output;
    }

    public static void setOutput(String output) {
        Sender.output = output;
    }

    public void send(String msg) {
        appendOutput("Sending " + msg + "\n");
        try {
            Thread.sleep(1000);
        } catch (Exception e) {
            appendOutput("Thread interrupted\n");
        }
        appendOutput(msg + " Sent\n");
    }
}
